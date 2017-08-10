/**
 * Created by 思思 on 17/7/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../../Config/Color';
// 基类页面
import BaseCommon from './../../../Common/BaseCommonPage';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '测试页面复用Demo', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props, updateState) {
        super(props);
        this.props = props;
        this.baseCommon = new BaseCommon({...props,backPress:(e)=>this.onBackPress(e), title: '哈哈'});
        this.updateState = updateState;
    }
    onBackPress(e){
        this.props.navigator.pop();
        return true;
    }
    componentDidMount() {
        this.baseCommon.componentDidMount();
    }
    componentWillUnmount() {
        this.baseCommon.componentWillUnmount();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.testType.bind(this)}
                      ref={(ref) => { this.text = ref; }}>
                    测试组件类型
                </Text>
            </View>
        );
    }

    testType() {
        alert('测试类型');
        // console.log(this.toString());
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