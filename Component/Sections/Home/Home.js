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


export default class extends Component {
    // 设置导航栏样式
    static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: '主页', 
    // headerTintColor: '#06C1AE',
    headerStyle: {
        backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
    }
    });    

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    团购
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});