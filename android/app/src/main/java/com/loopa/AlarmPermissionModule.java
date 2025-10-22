package com.loopa;

import android.app.AlarmManager;
import android.content.Context;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Build;


public class AlarmPermissionModule extends ReactContextBaseJavaModule {
  public AlarmPermissionModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "AlarmPermission";
  }

  @ReactMethod
  public void canScheduleExactAlarms(Promise promise) {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) { 
        AlarmManager alarmManager = (AlarmManager) getReactApplicationContext().getSystemService(Context.ALARM_SERVICE);
        boolean allowed = alarmManager.canScheduleExactAlarms();
        promise.resolve(allowed);
      }else{
        // En versiones anteriores, el permiso no aplica
        promise.resolve(true);
      }
    } catch (Exception e) {
      promise.reject("ERROR", e);
    }
  }
}