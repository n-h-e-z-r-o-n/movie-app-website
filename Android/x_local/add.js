// Function to apply restrictions to a single iframe
function restrictIframe(iframe) {
  try {
    // Ensure sandbox attribute to block top-level navigation
    if (!iframe.hasAttribute('sandbox')) {
      iframe.setAttribute('sandbox', 'allow-scripts');
      console.log(`Added sandbox to iframe: ${iframe.src || 'no-src'}`);
    } else if (iframe.sandbox.contains('allow-top-navigation')) {
      iframe.sandbox.remove('allow-top-navigation');
      console.log(`Removed allow-top-navigation from iframe: ${iframe.src || 'no-src'}`);
    }

    const iframeWindow = iframe.contentWindow;
    const iframeDoc = iframe.contentDocument || iframeWindow.document;

    // Block window.open
    iframeWindow.open = function(url, name, specs) {
      console.warn(`Blocked iframe attempt to open new window to: ${url}`);
      return null;
    };

    // Block location changes
    Object.defineProperty(iframeWindow, 'location', {
      value: {
        ...iframeWindow.location,
        href: iframeWindow.location.href,
        assign: function(url) {
          console.warn(`Blocked iframe attempt to redirect via location.assign to: ${url}`);
        },
        replace: function(url) {
          console.warn(`Blocked iframe attempt to redirect via location.replace to: ${url}`);
        }
      },
      writable: false
    });

    // Block links with target="_blank"
    iframeDoc.addEventListener('click', (event) => {
      const target = event.target.closest('a');
      if (target && target.getAttribute('target') === '_blank') {
        event.preventDefault();
        console.warn(`Blocked iframe link with target="_blank" to: ${target.href}`);
      }
    });

    // Block form submissions with target="_blank"
    iframeDoc.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.getAttribute('target') === '_blank') {
        event.preventDefault();
        console.warn(`Blocked iframe form submission with target="_blank" to: ${form.action}`);
      }
    });

    // Mark iframe as processed
    iframe.dataset.redirectBlocked = 'true';
  } catch (e) {
    console.warn(`Could not access iframe content: ${e.message}`);
  }
}

// Function to initialize iframe blocking
function blockIframeRedirects() {
  // Apply restrictions to existing iframes
  document.querySelectorAll('iframe').forEach(restrictIframe);

  // Monitor dynamically added iframes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IFRAME' && !node.dataset.redirectBlocked) {
          restrictIframe(node);
        }
        // Check for iframes inside added nodes
        if (node.querySelectorAll) {
          node.querySelectorAll('iframe').forEach((iframe) => {
            if (!iframe.dataset.redirectBlocked) {
              restrictIframe(iframe);
            }
          });
        }
      });
    });
  });

  // Observe DOM changes
  observer.observe(document.body, { childList: true, subtree: true });

  console.log('Dynamic iframe redirect blocking initialized');
}

// Run on page load
window.addEventListener('load', blockIframeRedirects);
document.addEventListener('DOMContentLoaded', blockIframeRedirects);

// Function to safely add a dynamic iframe based on user preferences
function addDynamicIframe(src, containerId) {
  // Validate the src to prevent unsafe URLs (optional)
  if (!src || !/^https?:\/\//.test(src)) {
    console.warn(`Invalid or unsafe iframe src: ${src}`);
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID ${containerId} not found`);
    return;
  }

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.setAttribute('sandbox', 'allow-scripts'); // Restrict by default
  iframe.style.width = '100%';
  iframe.style.height = '400px'; // Adjust as needed
  iframe.dataset.redirectBlocked = 'true'; // Mark as processed

  // Append to container
  container.appendChild(iframe);

  // Apply restrictions immediately
  restrictIframe(iframe);

  console.log(`Added iframe with src: ${src}`);
}

// Example usage: Add iframe based on user input
// Assuming a form with an input for URL and a button
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#iframe-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const urlInput = form.querySelector('#iframe-url');
      const containerId = 'iframe-container'; // ID of the container div
      if (urlInput && urlInput.value) {
        addDynamicIframe(urlInput.value, containerId);
      }
    });
  }
});