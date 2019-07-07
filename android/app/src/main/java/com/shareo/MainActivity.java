package com.shareo;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.widget.ImageView.ScaleType;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "shareO";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this, true, ScaleType.FIT_XY);
        super.onCreate(savedInstanceState);
    }
}
