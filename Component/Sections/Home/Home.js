/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
    Image,
    Text,
    StatusBar
} from 'react-native';

import SearchBar from './../../Common/SearchBar';
import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NavigationItem from './../../Common/NavigationItem';
import HomeMenuView from './../Home/HomeMenuView';
import API from './../../Config/Api';
// import HttpTool from './../../Util/HttpTool';
import SpaceView from './../../Common/SpaceView';
import HomeGridView from './HomeGridView';
import HomeCell from './HomeCell';

export default class extends Component {
    // 设置导航栏样式
    static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: (
        <View style={styles.container}>
            <SearchBar style={styles.searchBarStyle} text = '搜索'/>
        </View>
    ),
    headerRight: (
        <NavigationItem
            icon={require('./../../Images/Home/icon_navigationItem_message_white@2x.png')}
            onPress={() => {
                alert('消息');
            }}
        />
    ),
    headerLeft: (
        <NavigationItem
            title='福州'
            titleStyle={{ color: 'white' }}
            onPress={() => {
                alert('地址');
    }}
        />
    ),
    headerStyle: {
        backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
    },
});

    constructor(props) {
        super(props);
        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false,
        }

        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.requestData = this.requestData.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        // 可能会报错说找不到navigation,记住方法调用这里先定义一下即可
        this.onGridSelected = this.onGridSelected.bind(this);
    }

    // 渲染子组件
    renderHeader() {
        return (
            <View>
                <HomeMenuView menuInfos={API.menuInfo} onMenuSelected={this.onMenuSelected} />
                <SpaceView/>
                <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected}></HomeGridView>
                <SpaceView/>
                <View style={styles.recommendHeader}>
                <Text>猜你喜欢</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                />
            </View>
        );
    }

    renderCell(info) {
        return(
            <HomeCell info={info.item}
                onPress={this.onCellSelected.bind(this)}>
            </HomeCell>
        )
    }

    keyExtractor(item, index) {
        return item.id;
    }

    // 数据请求
    componentDidMount() {
        // 视图一进来就进行刷新
        this.setState({ refreshing: true })
        this.requestData()
    }

    requestData() {
        this.requestDiscount()
        this.requestRecommend()
    }

    requestDiscount() {
        fetch(API.discount)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ discounts: json.data })
                console.log(json);
            })
            .catch((error) => {
                alert(error)
            })
    }

    requestRecommend() {
        fetch(API.recommend)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                let dataList = json.data.map(
                    (info) => {
                        return {
                            id: info.id,
                            imageUrl: info.squareimgurl,
                            title: info.mname,
                            subtitle: `[${info.range}]${info.title}`,
                            price: info.price
                        }
                    }
                )
                this.setState({
                    dataList: dataList,
                    refreshing: false,
                })
            })
            .catch((error) => {
                this.setState({ refreshing: false })
            })
    }

    onGridSelected(info) {  
        console.log('info'+info.type+'navigation = '+this.props.navigation);
        // 不知道这里为什么就是取不到this.state.discounts??
        // let discountsArr = this.state.discounts;   
        // let discount = discountsArr[index]

        if (info.type == 1) {
            StatusBar.setBarStyle('default', false)
            let location = info.tplurl.indexOf('http')
            let url = info.tplurl.slice(location)
            this.props.navigation.navigate('WebPage', { url: url })
        }
    }

    onCellSelected(info) {
       // push值传递
      this.props.navigation.navigate('GroupPurchase', { info: info })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarStyle: {
        width: Space.kScreenWidth * 0.8
        
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Color.kSeparatorColor,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
});