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

export default class CartFooter extends Component {
    render() {

        const { store } = this.props;
        const checkIcon = store.checkedAll ? require('./../../../Images/Setting/selected@2x.png') : require('./../../../Images/Setting/f_hs_activities_-approval_batch_choose@2x.png')
        return(
            <View style={styles.container}>
            <View style={{alignItems: 'center',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{store.onCheckedAll()}}>
                    <Image source={checkIcon}
                           style={styles.selectButtonStyle}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    全选
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>合计: {store.totalPrice}元</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: 44
    },
    selectButtonStyle: {

    },
    textStyle: {
        fontSize: 18,
        backgroundColor: 'orange',
        marginLeft: 20
    }
});