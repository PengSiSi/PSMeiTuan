package com.psmeituan;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import org.pgsqlite.SQLitePluginPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new ReactVideoPackage(),
            new RCTCameraPackage(),
            new PickerPackage(),
            new PickerViewPackage(),
            new ImagePickerPackage(),
<<<<<<< HEAD
            new MainReactPackage(),
            new ReactIMUIPackage(),
            new SQLitePluginPackage()
=======
            new MainReactPackage()
>>>>>>> 00a299dd020c3ecb44bb35c067bdf8ef936ec40e
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
