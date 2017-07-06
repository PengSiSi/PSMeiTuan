/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Color from './../../../Config/Color';
import AppState from './../../../Mobx/AppState';
import { observer } from 'mobx-react';

const APPState= new AppState();

@observer
export default class extends Component {

     static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Mobx学习', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                   计数器的一个Mobx例子
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 40}}>
                    <Text>
                    当前的值是: {APPState.timer}
                    </Text>
                    <TouchableOpacity onPress={()=>{this.onReset()}}>
                        <Text style={{backgroundColor: 'green', color: 'white', marginLeft: 30, fontSize: 20}}>
                        重置
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // 重置
    onReset() {
        APPState.resetTimer();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    welcome: {
        marginTop: 20,
        fontSize: 20, 
    }
});