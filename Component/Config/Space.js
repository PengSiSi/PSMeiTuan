/**
 * @providesModule Space
 */

import React, { Component } from 'react';
import {
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';

// 判断是否是iOS设备
const isIOS = () => {
  return Platform.OS === 'ios'
}

// 是否是Android设备
const isAndroid = () => {
  return Platform.OS === 'android'
}

// 是否是iPhoneX
const isIphoneX = () => {
  let dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

export default {
  kNormalSpace: 15,
  kiOSNavigationHeight: 64,
  kiOSStatusBarHeight: 20,
    /*最小线宽*/
  pixel: 1 / PixelRatio.get(),

    /*屏幕尺寸*/
  kScreenWidth: Dimensions.get('window').width,
  kScreenHeight: Dimensions.get('window').height,
  kScreenSize: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },
  // 适配iPhoneX的状态栏高度
  statusBarHeight: isIOS() ? (isIphoneX() ? 44 : 20) : 0
};
