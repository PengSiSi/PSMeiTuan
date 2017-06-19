/**
 * Created by 思思 on 17/6/17.
 * 
   <Separator />
 */

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import Screen from './../Util/Screen';

// create a component
export default class Separator extends PureComponent {
    render() {
        return (
            <View style={[styles.line, this.props.style]} />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    line: {
        width: Screen.width,
        height: Screen.onePixel,
        backgroundColor: 'gray',
    },
});
