
/**
 * Created by 思思 on 17/8/9.
 * // 搜索历史Demo
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
        headerTitle: '历史搜索', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
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