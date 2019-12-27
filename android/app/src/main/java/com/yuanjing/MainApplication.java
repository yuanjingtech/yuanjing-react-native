package com.yuanjing;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.yuanjing.generated.BasePackageList;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
          new BasePackageList().getPackageList(),
          Arrays.<SingletonModule>asList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
//       packages.add(new MyReactNativePackage());
      packages.add(new CodePush(this.getApplication().getResources().getString(R.string.appCenterCodePushDevelopmentKey), MainApplication.this, BuildConfig.DEBUG));
      // Add unimodules
      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
              new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
      packages.addAll(unimodules);
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
