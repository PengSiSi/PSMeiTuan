/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SearchBar from './../../Common/SearchBar';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import NearByList from './NearByList';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerRight: (
           <View style={styles.container}>
            <SearchBar style={styles.searchBarStyle} text='找附近的吃喝玩乐'/>
        </View>
        ),
        headerLeft: (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Image style={{ width: 13, height: 16 }} source={require('./../../Images/Public/icon_food_merchant_address@2x.png')} />
                <Text style={{ fontSize: 15, color: '#333333' }}>北京 海淀</Text>
            </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        }
    }); 

    render() {
        let titles = ['享美食', '住酒店', '爱玩乐', '全部']
        let types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠', '成人情趣'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '大宝剑', '电影院', '美发', '美甲'],
            []
        ]
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content'></StatusBar>
                <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#FE566D'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
            // renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}
            >
                {titles.map((title, i) => (
                    <NearByList
                        tabLabel={titles[i]}
                        key={i}
                        types={types[i]}
                        navigation={this.props.navigation} />
                ))}
            </ScrollableTabView>
            </View>
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
        width: Space.kScreenWidth * 0.7
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#FE566D'
    },
});