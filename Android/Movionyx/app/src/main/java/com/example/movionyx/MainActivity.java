package com.example.movionyx;

import android.os.Bundle;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.VideoView;
import android.webkit.WebViewClient;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.xvr);
        VideoView fullScreenContainer = findViewById(R.id.fullscreen_container);



        WebSettings webSettings = webView.getSettings();     // getting web settings.

        webSettings.setJavaScriptEnabled(true); // Enable JavaScript if needed
        webSettings.setDomStorageEnabled(true); // Enable local storage if needed
        webSettings.setMediaPlaybackRequiresUserGesture(false); // Allow auto-play videos
        webView.setWebViewClient(new WebViewClient()); // Ensures links open in WebView

        //webView.loadUrl("https://movionyx.com"); // Replace with your URL

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("https://movionyx.com")) {
                    return false; // Allow loading
                } else {
                    Toast.makeText(MainActivity.this, "Redirect Blocked!", Toast.LENGTH_SHORT).show();
                    return true; // Block redirect
                }
            }
        });
        webView.loadUrl("https://movionyx.com"); // Change to your website
    }

// on below line creating a class for web chrome client.
    class WebChromeClient extends android.webkit.WebChromeClient {
        // on below line creating variables.
        private View customView;
        private android.webkit.WebChromeClient.CustomViewCallback customViewCallback;
        private int originalOrientation;
        private int originalSystemVisibility;

        WebChromeClient() {
        }

        @Nullable
        @Override
        public Bitmap getDefaultVideoPoster() {

            // on below line returning our resource from bitmap factory.
            if (customView == null) {
                return null;
            }
            return BitmapFactory.decodeResource(getApplicationContext().getResources(), 2130837573);
        }

        @Override
        public void onHideCustomView() {

            // on below line removing our custom view and setting it to null.
            ((FrameLayout) getWindow().getDecorView()).removeView(customView);
            this.customView = null;

            // on below line setting system ui visibility to original one and setting orientation for it.
            getWindow().getDecorView().setSystemUiVisibility(this.originalSystemVisibility);
            setRequestedOrientation(this.originalOrientation);

            // on below line setting custom view call back to null.
            this.customViewCallback.onCustomViewHidden();
            this.customViewCallback = null;
        }

        @Override
        public void onShowCustomView(View view, CustomViewCallback callback) {
            if (this.customView != null) {
                onHideCustomView();
                return;
            }
            // on below line initializing all variables.
            this.customView = view;
            this.originalSystemVisibility = getWindow().getDecorView().getSystemUiVisibility();
            this.originalOrientation = getRequestedOrientation();
            this.customViewCallback = callback;
            (FrameLayout) getWindow().getDecorView()).addView(this.customView, new FrameLayout.LayoutParams(-1, -1));
            getWindow().getDecorView().setSystemUiVisibility(3846);
        }
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