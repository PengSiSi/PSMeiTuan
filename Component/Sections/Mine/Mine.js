/**
 * Created by 思思 on 17/5/7.
 * "我的"页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ScrollView,
    Image
} from 'react-native';

import NavigationItem from './../../Common/NavigationItem';
import Color from './../../Config/Color';
import Space from './../../Config/Space';
import MineCell from './MineCell';
import SpaceView from './../../Common/SpaceView';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的', 
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <NavigationItem
                    icon={require('./../../Images/Mine/icon_navigationItem_set_white.png')}
                    onPress={() => {

                    }}
                />
                <NavigationItem
                    icon={require('./../../Images/Mine/icon_navigationItem_message_white.png')}
                    onPress={() => {
                    }}
                />
            </View>
        ),
    }); 

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <SpaceView></SpaceView>
                    {this.renderCells()}
                </ScrollView>
            </View>
        );
    }

    renderHeader() {
        return(
            <View style={styles.headerStyle}>
                <View style={styles.userContainerStyle}>
                    <Image style={styles.avatarStyle} 
                           source={require('./../../Images/Mine/avatar.png')}>
                    </Image>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ color: 'white' }}>思思</Text>
                            <Image style={{ marginLeft: 4 }} source={require('./../../Images/Mine/beauty_technician_v15@2x.png')}/>
                        </View>
                        <Text style={{ color: 'white', marginTop: 4 }}>个人信息 ></Text>
                    </View>
                </View>
            </View>
        )
    }

    renderCells() {
        let cells = []
        let dataListArr = this.getDataList();
        for (let i = 0; i < dataListArr.length; i++) {
            let sublistArr = dataListArr[i]
            for (let j = 0; j < sublistArr.length; j++) {
                let data = sublistArr[j]
                let cell = <MineCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
                cells.push(cell)
            }
            cells.push(<SpaceView key={i} />)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
            </View>
        )
    }

    onHeaderRefresh() {

    }

    getDataList() {
        return (
            [
                [
                    { title: '我的钱包', subtitle: '办信用卡', image: require('./../../Images/Mine/icon_mine_wallet@2x.png') },
                    { title: '余额', subtitle: '￥95872385', image: require('./../../Images/Mine/icon_mine_balance@2x.png') },
                    { title: '抵用券', subtitle: '63', image: require('./../../Images/Mine/icon_mine_voucher@2x.png') },
                    { title: '会员卡', subtitle: '2', image: require('./../../Images/Mine/icon_mine_membercard@2x.png') }
                ],
                [
                    { title: '好友去哪', image: require('./../../Images/Mine/icon_mine_friends@2x.png') },
                    { title: '我的评价', image: require('./../../Images/Mine/icon_mine_comment@2x.png') },
                    { title: '我的收藏', image: require('./../../Images/Mine/icon_mine_collection@2x.png') },
                    { title: '会员中心', subtitle: 'v15', image: require('./../../Images/Mine/icon_mine_membercenter@2x.png') },
                    { title: '积分商城', subtitle: '好礼已上线', image: require('./../../Images/Mine/icon_mine_member@2x.png') }
                ],
                [
                    { title: '客服中心', image: require('./../../Images/Mine/icon_mine_customerService@2x.png') },
                    { title: '关于美团', subtitle: '我要合作', image: require('./../../Images/Mine/icon_mine_aboutmeituan@2x.png') }
                ]
            ]
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    headerStyle: {
        backgroundColor: Color.kMainColor,
        // paddingBottom: 20,
    },
    iconStyle: {
        width: 27,
        height: 27
    },
    userContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatarStyle: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
});