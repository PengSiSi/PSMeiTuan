/**
 * Created by 思思 on 17/8/9.
 * 添加文章底部的View
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Space from './../../../Config/Space';

export default class  extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.props.pressAddText}>
                    添加文本
                </Text>
                <Text style={styles.welcome} onPress={this.props.pressAddImage}>
                    添加图片
                </Text>
                <Text style={styles.welcome} onPress={this.props.pressAddCard}>
                    添加卡券
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 44,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});