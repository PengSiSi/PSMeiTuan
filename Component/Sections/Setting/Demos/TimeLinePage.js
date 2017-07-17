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
    ListView
} from 'react-native';

import Color from './../../../Config/Color';
import Space from './../../../Config/Space';

const ORDER_STATUS_DATA={
    "api":"GetSearchHistory",
    "v":"1.0",
    "code":"0",
    "msg":"success",
    "data":[{
        "id":0,
        "status":"订单已提交",
        "remark":"请耐心等待商家确认",
        "time":"8月5日 18:13"
    },{
        "id":1,
        "status":"支付成功",
        "remark":"",
        "time":"8月5日 18:15"
    },{
        "id":2,
        "status":"商家已接单",
        "remark":"商品准备中,由商家配送,配送进度请咨询商家",
        "time":"8月5日 18:20"
    },{
         "id":3,
        "status":"配送进行中",
        "remark":"你的商品正由XX配送员火速送达中...",
        "time":"8月5日 18:25"
    },{
         "id":4,
        "status":"订单完成",
        "remark":"任何意见和吐槽,都欢迎联系我们",
        "time":"8月5日 18:34"
    }]
};

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '时间线Demo', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    constructor(props) {
        super(props);
        this.state={
         dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         orderStatuts : ORDER_STATUS_DATA.data,
      }

      this.renderItem = this.renderItem.bind(this); 
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    this.state.orderStatuts === undefined ? [] : this.state.orderStatuts))}
            </View>
        );
    }

    renderContent(dataSource) {
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{flex:1, marginTop:20}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
            />
        );
    }

    // 注意这里的rowData, sectionID, rowID, highlightRow要顺序
    renderItem(rowData, sectionID, rowID, highlightRow) {
        console.log('rowID--'+rowID);
        let length = this.state.orderStatuts.length - 1;
        console.log('length---'+length);
        return (
            <View style={{flexDirection:'row',height: 75}}>
                <View>
                    {  // 根据rowID进行相应的隐藏,显示线
                        rowID === '0' ? <View style={{height:20}}></View> : <Image source={require('./../../../Images/Setting/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
                    }
                    <Image source={require('./../../../Images/Home/icon_homepage_beautyCategory.png')} style={{width:30,height:30,marginLeft:10}}/>
                    { 
                        rowID === length.toString() ? <View style={{height:20}}></View> : <Image source={require('./../../../Images/Setting/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
                    }
                </View>
                <View>
                    <Image source={require('./../../../Images/Setting/ic_order_status_item_bg.png')} 
                           style={{height:65,marginLeft:10,width:(Space.kScreenWidth-60)}}>
                        {this.renderCenterContent(rowData)}
                    </Image>
                     
                </View>
            </View>
        );
    }

    renderCenterContent(data) {
        return (
            <View style={{marginLeft:15,marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontSize:14,backgroundColor:'#00000000'}}>{data.status}</Text>
                        <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                        <Text style={{color:'#777',fontSize:12,backgroundColor:'#00000000'}}>{data.time}</Text>
                    </View>
                    </View>
                        <Text style={{color:'#777',fontSize:12,marginTop:10,backgroundColor:'#00000000'}}>{data.remark}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});