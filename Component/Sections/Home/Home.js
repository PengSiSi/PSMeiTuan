/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

import SearchBar from './../../Common/SearchBar';
import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NavigationItem from './../../Common/NavigationItem';

export default class extends Component {
    // 设置导航栏样式
    static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: (
        <View style={styles.container}>
            <SearchBar style={styles.searchBarStyle}/>
        </View>
    ),
    headerRight: (
        <NavigationItem
            icon={require('./../../Images/Home/icon_navigationItem_message_white@2x.png')}
            onPress={() => {

            }}
        />
    ),
    // headerLeft: (
    //     <NavigationItem
    //         title='福州'
    //         titleStyle={{ color: 'white' }}
    //         onPress={() => {

    //         }}
    //     />
    // ),
    headerStyle: {
        backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
    },
});

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarStyle: {
        width: Space.kScreenWidth * 0.5
    }
});