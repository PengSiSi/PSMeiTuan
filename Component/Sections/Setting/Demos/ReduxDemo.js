/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
    AsyncStorage
} from 'react-native';

import Color from './../../../Config/Color';
import Space from './../../../Config/Space';
import { connect } from 'react-redux';
import { backImage,getBackImage } from './../../../Redux/Actions/BackImageAction';

class ReduxDemo extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Redux学习', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: 'https://ws1.sinaimg.cn/large/610dc034ly1fgllsthvu1j20u011in1p.jpg'
        }
    }

    render() {
         const { beautyReducers } = this.props;

        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.imageUrl}}
                       resizeMode='cover'
                       style={styles.imageStyle}>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>点击选择图片</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
    
    onButtonPress() {
        // alert('选择图片');
        // const {navigate} = this.props.navigation;
        // navigate('Beautypage');
        this.props.navigation.navigate('Beautypage', {
             // 回传过来的url
            callback: (data)=>{
                console.log(data); // 打印值为：'回调参数'
                // 实现一: 直接使用回调实现
                this.setState({
                    imageUrl: data
                });
                // let SHITUIMAGEKEY = 'PSMeiTuan';
                // AsyncStorage.setItem(SHITUIMAGEKEY,data,(error)=>{
                //     if (error){
                //         console.log('存储失败' + error);
                //     } else {
                //         console.log('存储成功');
                //         // 之前的做法是这里发送通知到首页
                //         // DeviceEventEmitter.emit('SHITUIMAGE',url);
                //         // this.props.getQiNiuToken();
                //         this.props.getBackImage(data);
                // }
            // });
        }});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageStyle: {
        width: Space.kScreenWidth,
        height: Space.kScreenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: Color.kMainColor,
        width: Space.kScreenWidth - 80,
        height: 40,
        marginBottom: 40,
        marginTop: 350,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default connect((state) => {
    const { beautyReducers } = state;
    return {
        beautyReducers
    };
},{ backImage,getBackImage })(ReduxDemo)
