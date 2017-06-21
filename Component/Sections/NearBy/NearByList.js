/**
 * 首页列表页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    PixelRatio,
    InteractionManager,
    ActivityIndicator,
    StatusBar,
    BackHandler
} from 'react-native';

import API from './../../Config/Api';
import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NearByHeaderView from './NearByHeaderView';
import HomeCell from './../Home/HomeCell';
import {PullList} from 'react-native-pull';

export default class NearByList extends Component {

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
        dataSource:ds,
        showLoading: true,
        noMoreData: false,
        typeIndex: 0,
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新数据</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>松开立即刷新</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>正在刷新数据中</Text>
            </View>
        );
    }

    render() {
        return (
          <View style={styles.container}>
            <View style= {{height: 15}}></View> 
            <PullList
                  style={{backgroundColor: 'white'}}
                  onPullRelease={this.onPullRelease.bind(this)} 
                  // 这里写了会导致报错： Rawtext '' must be wrapped in an explicit <Text> component,还不知道原因
                //   topIndicatorRender={this.topIndicatorRender} 
                  topIndicatorHeight={60}
                  dataSource={this.state.dataSource}
                  pageSize={10}
                  enableEmptySections
                  initialListSize={5}
                  renderRow={this.renderRow}
                  onEndReached={this.loadMore}
                  onEndReachedThreshold={60}
                  renderFooter={this.renderFooter}
                  renderHeader = {this.renderHeader}
                  />
          </View>
        );
    }
    
    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    renderFooter(){

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

    renderHeader() {
        // console.log('types ==='+this.props.types.length); // 8
        return(
            <NearByHeaderView 
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index) => {
                if (index != this.state.typeIndex) {
                    this.setState({ typeIndex: index })
                    this.listView.startHeaderRefreshing()
                }
            }}>
            </NearByHeaderView>
            // <View style={{height: 100, backgroundColor: 'red'}}></View>
        );
    }

     // 具体的每行
    renderRow(rowData) {
        return(
           <HomeCell
              info={rowData}
              onPress={() => {
              this.props.navigation.navigate('GroupPurchase', { info: rowData })
              }}
           />
        );
    }

    loadMore() {
       this.requestData()
    }

    // 数据请求
    componentDidMount() {
        // 从网络请求数据
        this.requestData();
    }

     requestData() {
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
                // 产生随机数据
                dataList.sort(() => { return 0.5 - Math.random() })
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataList),
                    refreshing: false
                })
            })
            .catch((error) => {
                this.setState({ refreshing: false })
            })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        BackHandler.exitApp();
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // cell
    cellStyle: {
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: 'gray',
        flexDirection:'row',
        padding:10,
    },
    containerViewStyle: {
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    // 左边view
    leftViewStyle: {
        justifyContent:'space-between',
        width: Space.kScreenWidth * 0.7,
    },
    // 教务处
    rightItemStyle: {
        fontSize: 15,
        color: 'green',
        borderRadius: 4,borderWidth: 0.5,
        borderColor: '#ccc',
        marginRight: 20
    },
    loadDataStyle: {
        marginVertical:20
    },
    loadMoreStyle:{
        marginVertical:20,
        justifyContent: 'center'
    },
    loadMoreTextStyle: {
        textAlign: 'center'
    }
});
