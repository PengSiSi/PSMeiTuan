/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// 注意: 这里子组件必须监听
@observer

export default class CartItem extends Component {
    render() {
        const { data } = this.props;
        const { store } = this.props;
        const checkIcon = data.checked ? require('./../../../Images/Setting/selected@2x.png') : require('./../../../Images/Setting/f_hs_activities_-approval_batch_choose@2x.png')
        return(
        <View>
          <View style={styles.rowContainer}>
          <TouchableOpacity onPress={()=>store.onChecked(data.id)}>
            <Image style={styles.thumb} source={checkIcon} />
          </TouchableOpacity>
            <View style={{flex:1}}>
              <Text style={{flex:1}}>{data.name}</Text>
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Text style={{color:'#f28006',flex:1}}>¥{data.price}</Text>
                <Text style={{color:'#f28006',flex:1}}>小计:¥{data.price * data.buyNum}</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{height:25,width:25,fontSize: 17}}
                        onPress={()=>{
                            // alert('+');
                            store.add(data.id);
                        }}>
                      + 
                  </Text>
                  <Text style={{color:'#f28006',paddingLeft:10,paddingRight:10}}>{data.buyNum}</Text>
                  <Text style={{height:25,width:25,fontSize: 17}}
                        onPress={()=>{
                            // alert('-');
                            store.sub(data.id);
                        }}> - </Text>
                  <Text style={{fontSize: 16, color: 'gray'}}
                        onPress={()=>{
                            // alert('删除');
                            store.removeItem(data.id)
                        }}> 删除 </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eef0f3',
    paddingBottom:68,
  },
  thumb: {
    // width: 50,
    // height: 50,
    marginRight: 10
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height:70,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  line:{
    backgroundColor:'#eef0f3',
    height:1,
  },
});