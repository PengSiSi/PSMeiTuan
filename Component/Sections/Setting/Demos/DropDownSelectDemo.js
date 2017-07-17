/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../../Config/Color';

export default class extends Component {

    static navigationOptions = ({
    navigation,
    screenProps
  }) => ({
    headerTitle: '下拉筛选选择Demo',
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center' // 设置安卓端导航栏标题不居中显示
    },
    headerStyle: {
      backgroundColor: Color.kMainColor // 设置导航栏的背景颜色,headerTintColor设置无效
    },
  });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    发现
                </Text>
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
    },
});