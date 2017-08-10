/**
 * Created by 思思 on 17/8/10.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Space from './../../../Config/Space';

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.imageName} style={styles.imageViewStyle}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 10  // 设置图片的间距
    },
    imageViewStyle: {
        width: Space.kScreenWidth - 20,
        height: 150,
        backgroundColor: 'green',
    }
});