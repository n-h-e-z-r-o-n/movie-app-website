package com.example.movionyx;

import android.os.Bundle;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.VideoView;
import android.webkit.WebViewClient;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;


public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.xvr);




        WebSettings webSettings = webView.getSettings();     // getting web settings.

        webSettings.setJavaScriptEnabled(true); // Enable JavaScript if needed
        webSettings.setDomStorageEnabled(true); // Enable local storage if needed
        webSettings.setMediaPlaybackRequiresUserGesture(false); // Allow auto-play videos
        webView.setWebViewClient(new WebViewClient()); // Ensures links open in WebView

        //webView.loadUrl("https://movionyx.com"); // Replace with your URL

        webView.setWebChromeClient(new CustomWebChromeClient(MainActivity.this)); // Ensures links open in WebView

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("https://movionyx")) {
                    return false; // Allow loading
                } else {
                    Toast.makeText(MainActivity.this, "Redirect Blocked!", Toast.LENGTH_SHORT).show();
                    return true; // Block redirect
                }
            }
        });
        webView.loadUrl("https://movionyx.com"); // Change to your website
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



}