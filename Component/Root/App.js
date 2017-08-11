/**
 * Created by 思思 on 17/6/16.
 */
import React, {
    Component
} from 'react';
import {
    StatusBar
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';

import HomeScreen from './../Sections/Home/Home';
import OrderScreen from './../Sections/Order/Order';
import NearByScreen from './../Sections/NearBy/NearBy';
import MineScreen from './../Sections/Mine/Mine';
import TabBarItem from './../Common/TabBarItem';
import GroupPurchaseScene from './../Sections/GroupPurchase/GroupPurchase';
import WebScene from './../Common/DetailWebScene';
import SettingScene from './../Sections/Setting/Setting';
import Login from './../Sections/Login/Login';
import ScrollTabViewDemo from './../Sections/Setting/Demos/ScrollableTabViewSDemo';
import MultipleSelectedDemo from './../Sections/Setting/Demos/MultipleSelected';
import CalendarDemo from './../Sections/Setting/Demos/CalendarDemo';
import MyApplyDemo from './../Sections/Setting/Demos/MyApplyDemo';
import AntdMobileDemo from './../Sections/Setting/Demos/AntdMobileDemo';
import GridDemo from './../Sections/Setting/Demos/GridDemo';
import AddImagesDemo from './../Sections/Setting/Demos/AddImagesDemo';
import AntdPickerImageDemo from './../Sections/Setting/Demos/AntdImagePicker';
import ReduxDemo from './../Sections/Setting/Demos/ReduxDemo';
import BeautyDemo from './../Sections/Setting/Demos/BeautyPage';
import ContactDemo from './../Sections/Setting/Demos/ContactDemo';
import MobxDemo from './../Sections/Setting/Demos/MobxDemo';
import CartMobxDemo from './../Sections/Setting/Demos/CartMobxDemo';
import TimeLineDemo from './../Sections/Setting/Demos/TimeLinePage';
// <<<<<<< HEAD
import DropDownSelectDemo from './../Sections/Setting/Demos/DropDownSelectDemo';

import ZXSportDemon from './../Sections/Setting/Demos/ZXSportMenu';
import TextDemo from './../Sections/Setting/Demos/TextDemo';
import VideoDemo from './../Sections/Setting/Demos/VideoDemo';
import IMUIDemo from './../Sections/Setting/Demos/IMUIDemo';
import AddArticelDemo from './../Sections/Setting/Demos/AddArticleDemo';
import SearchHistoryDemo from './../Sections/Setting/Demos/SearchHistoryDemo';
import AgendaScreenDemo from './../Sections/Setting/Demos/AgendaScreen';
import EchartsDemo from './../Sections/Setting/Demos/EchartsDemo';

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export default class APP extends Component {

    // 全局设置状态栏样式
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return ( < Navigator onNavigationStateChange = {
                (prevState, currentState) => {
                    const currentScene = getCurrentRouteName(currentState);
                    const previousScene = getCurrentRouteName(prevState);
                    if (previousScene !== currentScene) {
                        if (lightContentScenes.indexOf(currentScene) >= 0) {
                            StatusBar.setBarStyle('light-content')
                        } else {
                            StatusBar.setBarStyle('dark-content')
                        }
                    }
                }
            }
            />
        );
    }
}

//// 为了实现登录的modal效果,所以将Main页面单独拆分出来.
const MineStack = StackNavigator({
    Mine: {
        screen: MineScreen,
        navigationOptions: ({
            navigation
        }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({
                focused,
                tintColor
            }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./../Images/tabbar/pfb_tabbar_mine@2x.png')}
                    selectedImage={require('./../Images/tabbar/pfb_tabbar_mine_selected@2x.png')}
                />
            )
        }),
    },
    Login: {
        screen: Login,
        headerBackTitle: false,
        // 这里需要设置和Mine一样的navigationOptions,否则Modal到登录页底部的TabbarItem会消失
        navigationOptions: ({
            navigation
        }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({
                focused,
                tintColor
            }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./../Images/tabbar/pfb_tabbar_mine@2x.png')}
                    selectedImage={require('./../Images/tabbar/pfb_tabbar_mine_selected@2x.png')}
                />
            )
        }),
    }
}, {
    mode: 'modal',
});

const Tab = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
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
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '附近',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
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
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
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
            screen: MineStack,
            // navigationOptions: ({ navigation }) => ({
            //     tabBarLabel: '我的',
            //     tabBarIcon: ({ focused, tintColor }) => (
            //         <TabBarItem
            //             tintColor={tintColor}
            //             focused={focused}
            //             normalImage={require('./../Images/tabbar/pfb_tabbar_mine@2x.png')}
            //             selectedImage={require('./../Images/tabbar/pfb_tabbar_mine_selected@2x.png')}
            //         />
            //     )
            // }),
            navigationOptions: {
                header: null
            }
        },
    }, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#06C1AE',
            inactiveTintColor: '#979797',
            style: {
                backgroundColor: '#ffffff'
            },
        },
    }

);

const Navigator = StackNavigator({
    Tab: {
        screen: Tab
    },
    GroupPurchase: {
        screen: GroupPurchaseScene
    },
    WebPage: {
        screen: WebScene
    },
    Setting: {
        screen: SettingScene
    },
    ScrollTabViewPage: {
        screen: ScrollTabViewDemo
    },
    MultipleSelectedPage: {
        screen: MultipleSelectedDemo
    },
    CalendarPage: {
        screen: CalendarDemo
    },
    MyApplyPage: {
        screen: MyApplyDemo
    },
    AntdMobilePage: {
        screen: AntdMobileDemo
    },
    Gridpage: {
        screen: GridDemo
    },
    AddImagesPage: {
        screen: AddImagesDemo
    },
    AntdPickerImagePage: {
        screen: AntdPickerImageDemo
    },
    ReduxDemoPage: {
        screen: ReduxDemo
    },
    Beautypage: {
        screen: BeautyDemo
    },
    ContactDemoPage: {
        screen: ContactDemo
    },
    MobxDemoPage: {
        screen: MobxDemo
    },
    CartMobxDemoPage: {
        screen: CartMobxDemo
    },
    TimeLineDemoPage: {
        screen: TimeLineDemo
    },
    ZXSportDemonPage: {
        screen: ZXSportDemon
    },
    DropDownDemo: {
        screen: DropDownSelectDemo
    },
    TextDemo: {
        screen: TextDemo
    },
    VideoDemo: {
        screen: VideoDemo
    },
    IMUIDemo: {
        screen: IMUIDemo
    },
    SearchHistoryDemo: {
        screen: SearchHistoryDemo
    },
    AddArticelDemo: {
        screen: AddArticelDemo
    },
    AgendaScreen: {
        screen: AgendaScreenDemo
    },
    EchartsDemo: {
        screen: EchartsDemo
    }
}, {
    navigationOptions: {
        // headerStyle: { backgroundColor: color.theme }
        headerBackTitle: null,
        headerTintColor: '#333333',
        showIcon: true,
    },
});