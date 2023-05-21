package com.arkultur.arkham
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.ar.core.codelabs.hellogeospatial.*
import android.content.Intent
import android.util.Log

class GeospacialModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "Geospacial"

    @ReactMethod(isBlockingSynchronousMethod = false)
    fun runPoc() {
        val context: ReactApplicationContext = reactApplicationContext
        val intent = Intent(context, HelloGeoActivity::class.java)
        val flags = Intent.FLAG_ACTIVITY_NEW_TASK

        if (intent.resolveActivity(context.packageManager) != null) {
            intent.flags = flags
            context.startActivity(intent)
        }
    }
}
