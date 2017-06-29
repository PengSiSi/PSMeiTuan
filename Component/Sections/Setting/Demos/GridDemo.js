/**
 * Created by 思思 on 17/6/28.
 * 参考博客: http://www.jianshu.com/p/a367312d575e 
 * 这里renderImage使用有问题,这里暂时在组件内创建实现后续完善
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import Color from './../../../Config/Color';
import GrideCell from './../../../Common/GridCell';

export default class GridDemo extends Component {

     static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Gride的使用', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <GrideCell
                        title="接单"// 文字
                        padding={3}// 文字与图片间距
                        badgeStyle={{flex: 1}}
                        backgroundColor={{backgroundColor: 'orange'}}// 大圆背景色
                        badgeText={10}// 消息提示
                        iconName={require('./../../../Images/Home/icon_deal_anytime_refund.png')}
                        // renderImage={() => <Text style={styles.icon}>111</Text>}// 图标
                        // renderImage={()=>{
                        //     <Image source={require('./../../../Images/Home/icon_deal_anytime_refund.png')}
                        //            style={styles.icon}>
                        //     </Image>
                        // }}
                        clickAction={() => { // 点击事件

                        }
                    }
                    >
                </GrideCell>
                <View style={styles.line}></View>
                <GrideCell
                        title="发运"
                        padding={2}
                        badgeStyle={{flex: 1}}
                        backgroundColor={{backgroundColor: 'gray'}}
                        badgeText={5}
                        iconName={require('./../../../Images/Home/icon_deal_anytime_refund.png')}
                        // renderImage={() => <Text style={styles.icon}>111</Text>}
                        clickAction={() => {
                            
                        }}
                />
            </View>
        )};
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: 'gray',
        width: StyleSheet.hairlineWidth,
    },
    icon: {
        // fontFamily: 'iconfont',
        fontSize: 23,
        color: 'white',
    },
});