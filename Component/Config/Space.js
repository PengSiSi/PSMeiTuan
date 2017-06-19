/**
 * @providesModule Space
 */

import React, { Component } from 'react';
import {
    PixelRatio,
    Dimensions
} from 'react-native';

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
};
