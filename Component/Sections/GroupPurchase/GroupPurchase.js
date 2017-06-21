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
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import NavigationItem from './../../Common/NavigationItem';
import Color from './../../Config/Color';
import Space from './../../Config/Space';
import RefreshListView from './../../Common/RefreshListView';
import GroupPurchaseCell from './../Home/HomeCell';
// 注意:export default才是直接import,其余组件引入使用{}
import API, {recommendUrlWithId}from './../../Config/Api';
import SeparatorView from './../../Common/Separator';
import SpaceView from './../../Common/SpaceView';
import Button from './../../Common/Button';
import RefreshState from './../../Common/RefreshState';

var listView;

export default class GroupPurchase extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '团购详情',
        headerStyle: { backgroundColor: 'white' },
        headerRight: (
            <NavigationItem
                icon={require('./../../Images/Public/icon_navigationItem_share@2x.png')}
                onPress={() => {
                    alert('分享');
                }}
            />
        ),
        headerBackTitleStyle: {
            color: Color.kMainColor,
        }
    }); 

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listView.startHeaderRefreshing();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    renderRow={(rowData) =>
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={() => this.props.navigation.navigate('GroupPurchase', { info: rowData })}
                        />
                    }
                    onHeaderRefresh={() => this.requestData()}
                />
            </View>
        );
    }

    renderHeader() {
        // 取得push过来传递的数据
        let info = this.props.navigation.state.params.info;
        return(
            <View>
                <View>
                    <Image style={styles.banner} source={{ uri: info.imageUrl.replace('w.h', '480.0') }}></Image>
                    <View style={styles.topContainer}>
                        <Text style={{ color: Color.kMainColor }}>￥</Text>
                        <Text style={{ marginBottom: 0 }}>{info.price}</Text>
                        <Text style={{ marginLeft: 10 }}>门市价：￥{(info.price * 1.1).toFixed(0)}</Text>
                        <View style={{ flex: 1 }} />
                        <Button
                            title='立即抢购'
                            style={{ color: 'white', fontSize: 18 }}
                            containerStyle={styles.buyButton}
                        />
                    </View>
                </View>
                <SeparatorView/>
                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{ width: 20, height: 20 }} source={require('./../../Images/Home/icon_deal_anytime_refund.png')} />
                        <Text style={{ color: '#89B24F' }}>  随时退</Text>
                        <View style={{ flex: 1 }} />
                        <Text>已售{1234}</Text>
                    </View>
                </View>
                <SpaceView/>
                 <View style={styles.tipHeader}>
                    <Text>看了本团购的用户还看了</Text>
                </View>
            </View>
        );
    }

    requestData() {
        this.requestDetail();
        this.requestRecommend();
    }

    requestDetail() {
        //原详情接口已经被美团关掉，这里暂时从上一级列表中获取详情数据
    }

    requestRecommend() {
        // 取得push过来传递的数据
        let info = this.props.navigation.state.params.info;
        fetch(recommendUrlWithId(info.id))
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                let dataList = json.data.deals.map((info) => {
                    return {
                        id: info.id,
                        imageUrl: info.imgurl,
                        title: info.brandname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                })
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataList)
                })
                setTimeout(() => {
                    this.listView.endRefreshing(RefreshState.NoMoreData)
                }, 500);
            })
            .catch((error) => {
                this.listView.endRefreshing(RefreshState.Failure)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: Space.kScreenWidth,
        height: Space.kScreenWidth * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Color.kSeparatorColor,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    }
});