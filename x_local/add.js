// List of common ad-related selectors (classes, IDs, attributes, iframes)
const adSelectors = [
  '[class*="ad-"]',
  '[class*="ads-"]',
  '[class*="banner"]',
  '[class*="sponsored"]',
  '[id*="ad-"]',
  '[id*="ads-"]',
  '[id*="banner"]',
  '[data-ad]',
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="adsense"]',
  'iframe[src*="adserver"]',
  'div.google-ad',
  'a[href*="doubleclick.net"]',
  'a[href*="adsense"]',
  'a[target="_blank"]', // Target links that open in new tabs
];

// List of ad-related URL patterns for redirect blocking
const adUrlPatterns = [
  /doubleclick\.net/,
  /adsense\.google\.com/,
  /adserver/,
  /banner/,
  /sponsored/,
];

// Function to hide ad elements
function hideAds() {
  adSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none'; // Hide element
        // Optionally: el.remove(); to remove element entirely
        if (el.tagName === 'A') {
          el.removeAttribute('target'); // Remove target="_blank"
          el.addEventListener('click', preventAdRedirect); // Add click handler
        }
        if (el.tagName === 'IFRAME') {
          el.setAttribute('src', 'about:blank'); // Neutralize iframe
        }
      });
    } catch (e) {
      console.error('Error processing selector', selector, e);
    }
  });
}

// Function to prevent redirects from ad links
function preventAdRedirect(event) {
  const href = event.target.href;
  if (href && adUrlPatterns.some(pattern => pattern.test(href))) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Blocked ad redirect to:', href);
  }
}

// Override window.location setters to block ad redirects
function blockLocationRedirects() {
  const originalLocation = window.location;
  const locationDescriptors = Object.getOwnPropertyDescriptors(window.location);

  ['href', 'assign', 'replace'].forEach(prop => {
    const originalSetter = locationDescriptors[prop]?.set;
    if (originalSetter) {
      Object.defineProperty(window.location, prop, {
        set(value) {
          if (adUrlPatterns.some(pattern => pattern.test(value))) {
            console.log('Blocked location redirect to:', value);
            return;
          }
          originalSetter.call(window.location, value);
        },
        configurable: true,
      });
    }
  });
}

// Run ad blocker when DOM is fully loaded
window.addEventListener('load', () => {
  if (typeof document !== 'undefined') {
    hideAds();
    blockLocationRedirects();
    // Observe DOM changes for dynamically loaded ads
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(() => hideAds());
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
});

// Prevent clicks on ad links from triggering redirects
document.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && adUrlPatterns.some(pattern => pattern.test(event.target.href))) {
    event.preventDefault();
    console.log('Blocked ad link click:', event.target.href);
  }
});

console.log('Ad blocker initialized');