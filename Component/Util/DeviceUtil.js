import React, { Component } from 'react'
import {Platform, Dimensions} from 'react-native'

// 是否是iPhoneX
export const isIphoneX = () => {
    let dimen = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
      )
}