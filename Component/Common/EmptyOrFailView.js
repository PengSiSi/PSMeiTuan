/**
 * 网络错误view
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Color from './../Config/Color';
import Space from './../Config/Space';

export default class EmptyOrFailView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {emptyOrFailTip,subTitle} = this.props;
        return (
        //    <View style={styles.container}>
            <View style={styles.container}>
                {/*上部分*/}
                <Image source={require('./../Images/Setting/ic_no_exist.png')}
                       resizeMode={'contain'}/>
                {/*中间*/}
                <Text style={{padding: 8, color: 'gray'}}>{emptyOrFailTip}</Text>
                {/*下部分*/}
                {
                <TouchableOpacity activeOpacity={0.8}
                                    onPress={this.props.reLoadData}>
                    <Text style={{color: 'gray'}}>{subTitle}</Text>
                </TouchableOpacity>
                }
            </View>
        //  </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: Space.kScreenWidth,
        // height: Space.kScreenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});