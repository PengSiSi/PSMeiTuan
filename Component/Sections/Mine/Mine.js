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

    static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: '我的', 
    headerStyle: {
        backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
    }
    }); 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    我的
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