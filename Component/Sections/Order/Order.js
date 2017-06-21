/**
 * Created by 思思 on 17/6/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    InteractionManager,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import MineCell from './../Mine/MineCell';
import OrderMenuItem from './OrderMenuItem';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import API from './../../Config/Api';
import OrderCell from './../Home/HomeCell';
import SpaceView from './../../Common/SpaceView';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: '订单', 
    headerStyle: {
        backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
        }
    }); 

    static defaultProps = {

    };

     // 构造
    constructor(props) {
        super(props);
        console.log(this.props);
        // 1. 数据源
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // 初始状态
        this.state = {
            dataSource: ds.cloneWithRows([]),
            showLoading: true,
            isRefreshing: false
        };
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

        // 可以写在最外面为全局变量《不过不建议这么做》，也可以直接定义，不写var，默认为全局变量，用var定义会报错没有定义此数组
        orderMenuItemsArr = [
            {title: '待付款',
             icon: require('./../../Images/Order/order_tab_need_pay@2x.png')
            },
            {title: '待使用',
             icon: require('./../../Images/Order/order_tab_need_use@2x.png')
            },
            {title: '待评价',
             icon: require('./../../Images/Order/order_tab_need_review@2x.png')
            },
            {title: '退款/售后',
             icon: require('./../../Images/Order/order_tab_needoffer_aftersale@2x.png')
            }
        ]
    }

    render() {
        return (
             <View style={styles.container}>
               <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    renderHeader={this.renderHeader}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
            </View>
        );
    }

     // 具体的每行
    renderRow(rowData) {
        return(
           <OrderCell
              info={rowData}
              onPress={() => {
              // push值传递
              this.props.navigation.navigate('GroupPurchase', { info: rowData })
              }}
           />
        );
    }

    renderHeader() {
        return(
            <View>
                <MineCell title='我的订单' subtitle='全部订单' style={{ height: 38 }}></MineCell>
                <View style={{height: 0.5,backgroundColor: Color.kSeparatorColor}}></View>
                <View style={styles.itemContainer}>
                    {this.renderMenuItems()}
                </View>
                <SpaceView></SpaceView>
            </View>
       );
    }

    renderMenuItems() {
        let menuItems = [];
        for (var index in orderMenuItemsArr) {
             var element = orderMenuItemsArr[index];
             menuItems.push(
                 <OrderMenuItem title={element.title} icon={element.icon} key={index}>
                 </OrderMenuItem>
             );
        }
        return menuItems;
    }

    renderFooter() {
         if (this.state.noMoreData){
            return (
                <View style={styles.loadMoreStyle}>
                    <Text style={styles.loadMoreTextStyle}>没有更多数据了</Text>
                </View>
            )
        } else {
            return(
            <View style={{height: 60}}>
            <ActivityIndicator
                style={styles.loadMoreStyle}
            />
            </View>
        )
        }
    }

    onRefresh() {
       this.setState({refreshing: true});
       setTimeout(() => {
           this.setState({refreshing: true});
        }, 500);
       this.loadDataFormNet();
    }

    loadMore() {
       this.loadDataFormNet();
    }

     // 数据请求
    componentDidMount() {
        // 从网络请求数据
        this.loadDataFormNet();
    }

    loadDataFormNet() {
           fetch(API.recommend)
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                let dataList = json.data.map((info) => {
                    return {
                        id: info.id,
                        imageUrl: info.squareimgurl,
                        title: info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                })
                // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
                dataList.sort(() => { return 0.5 - Math.random() })
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(dataList)
                })
                setTimeout(() => {
                }, 500);
            })
            .catch((error) => {
                this.setState({
                    refreshing: false,
                })
            })
    }
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    },
});