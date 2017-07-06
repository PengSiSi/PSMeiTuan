/**
 * Created by 思思 on 17/7/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../../Config/Color.js';
import CartItem from './../Views/CartItem';
import CartFooter from './../Views/CartFooter';
import {observer} from 'mobx-react';
import CartState from './../../../Mobx/CartState';
import Provider from './../../../Mobx/Provider';

const store = new CartState();

@observer

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Mobx实现购物车', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
            <View style={styles.container}>
                {store.list.map((z, i) => <CartItem data={z} key={i} store={store}/>)}
                <CartFooter store={store}></CartFooter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});