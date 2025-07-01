package com.example.movionyx;

import android.os.Bundle;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;


import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import android.view.View;


import androidx.core.view.WindowInsetsControllerCompat;

import android.view.WindowManager;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
            WindowManager.LayoutParams params = getWindow().getAttributes();
            params.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(params);
        }
        setContentView(R.layout.activity_main);

        View rootView = findViewById(R.id.root_layout);
        rootView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );        WindowInsetsControllerCompat controller = ViewCompat.getWindowInsetsController(rootView);
        if (controller != null) {
            controller.hide(WindowInsetsCompat.Type.systemBars());
            controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        }

        WebView webView = findViewById(R.id.xvr);
        WebSettings webSettings = webView.getSettings();     // getting web settings.

        // Essential security settings
        webSettings.setJavaScriptEnabled(true); // Enable JavaScript if needed
        webSettings.setDomStorageEnabled(true); // Enable local storage if needed
        webSettings.setMediaPlaybackRequiresUserGesture(false); // Allow auto-play videos
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(false);

        //webSettings.setUserAgentString("MovionyxApp/1.0"); // Set custom User-Agent to identify your app

        webView.setWebViewClient(new WebViewClient()); // Ensures links open in WebView

        //webView.loadUrl("https://movionyx.com"); // Replace with your URL

        webView.setWebChromeClient(new CustomWebChromeClient(MainActivity.this)); // Ensures links open in WebView
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("https://movionyx") || url.startsWith("file:///android_asset/x_local/") || url.startsWith("https://github.com/n-h-e-z-r-o-n/")) {
                    return false; // Allow loading
                } else {
                    Toast.makeText(MainActivity.this, "", Toast.LENGTH_SHORT).show();
                    return true; // Block redirect
                }
            }
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                // This triggers for most network errors, including when a page fails to load.
                //loadErrorPage();
            }

            @Override
            public void onReceivedHttpError(WebView view, android.webkit.WebResourceRequest request, android.webkit.WebResourceResponse errorResponse) {
                // This handles HTTP errors like 404 or 500.
                //loadErrorPage();
            }
        });
        //webView.loadUrl("https://movionyx.com"); // Change to your website

        String urlToLoad = "file:///android_asset/x_local/index.html"; // default

        // Check if app was opened via external link
        if (getIntent() != null && getIntent().getData() != null) {
            urlToLoad = getIntent().getData().toString();
        }

        if (isNetworkAvailable()) {
            webView.loadUrl(urlToLoad);
        } else {
            loadOfflinePage();
        }
    }


    @Override
    protected void onSaveInstanceState(Bundle outState) {
        WebView webView = findViewById(R.id.xvr);
        super.onSaveInstanceState(outState);
        webView.saveState(outState); // Save WebView state
    }


    @Override
    public void onBackPressed() {
        WebView webView = findViewById(R.id.xvr);
        if (webView.canGoBack()) {
            webView.goBack(); // Go back in WebView history
        } else {
            super.onBackPressed(); // Exit app if no history
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
            return networkInfo != null && networkInfo.isConnected();
        }
        return false;
    }

    private void loadOfflinePage() {
        WebView webView = findViewById(R.id.xvr);
        webView.loadUrl("file:///android_asset/x_local/index.html");
    }

    private void loadErrorPage() {
        WebView webView = findViewById(R.id.xvr);
        webView.loadUrl("file:///android_asset/x_local/index.html");
    }

}


