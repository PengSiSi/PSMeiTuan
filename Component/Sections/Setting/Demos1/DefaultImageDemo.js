/**
 * Created by 思思 on 18/3/1.
 * 占位图实现
 */
 
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native';

import DefaultImage from './../../../Common/DefaultImage';
import Color from './../../../Config/Color';

export default class extends Component {
    static navigationOptions = ({
        navigation,
        screenProps
      }) => ({
        headerTitle: '占位图实现',
        headerTitleStyle: {
          color: 'white',
          alignSelf: 'center' // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
          backgroundColor: Color.kMainColor // 设置导航栏的背景颜色,headerTintColor设置无效
        },
      });
    
    constructor(props) {
        super(props);
        this.state = {
            
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <DefaultImage imageName={require('./../../../Images/Order/order_tab_need_pay@2x.png')}
                            //   source={require('./../../../Images/Home/icon_homepage_KTVCategory.png')} 
                              style={styles.imageStyle}>
                </DefaultImage>
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
    imageStyle: {
        width: 200,
        height: 200,
        marginTop: 100,
    }
});