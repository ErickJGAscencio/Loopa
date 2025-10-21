package com.loopa;

import android.app.AlarmManager;
import android.content.Context;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
      AlarmManager alarmManager = (AlarmManager) getReactApplicationContext().getSystemService(Context.ALARM_SERVICE);
      boolean allowed = alarmManager.canScheduleExactAlarms();
      promise.resolve(allowed);
    } catch (Exception e) {
      promise.reject("ERROR", e);
    }
  }
}