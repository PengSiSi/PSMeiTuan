/**
 * Created by 思思 on 17/6/16.
 */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import HomeScreen from './../Sections/Home/Home';
import OrderScreen from './../Sections/Order/Order';
import NearByScreen from './../Sections/NearBy/NearBy';
import MineScreen from './../Sections/Mine/Mine';

import TabBarItem from './../Common/TabBarItem';

export default class Root extends Component {

    // 全局设置状态栏样式
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator/>
        );
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/tabbar/pfb_tabbar_homepage@2x.png')}
                        selectedImage={require('./../Images/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            }),
        },
        Nearby: {
            screen: NearByScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '附近',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/tabbar/pfb_tabbar_merchant@2x.png')}
                        selectedImage={require('./../Images/tabbar/pfb_tabbar_merchant_selected@2x.png')}
                    />
                )
            }),
        },

        Order: {
            screen: OrderScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/tabbar/pfb_tabbar_order@2x.png')}
                        selectedImage={require('./../Images/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/tabbar/pfb_tabbar_mine@2x.png')}
                        selectedImage={require('./../Images/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#06C1AE',
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab },
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
);

