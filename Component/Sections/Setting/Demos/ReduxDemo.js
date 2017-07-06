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

// 显示图片的url,避免警告,这里给一个占位的默认图片
let imageUri = 'https://ws1.sinaimg.cn/large/610dc034ly1fgllsthvu1j20u011in1p.jpg';

class ReduxDemo extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Redux学习', 
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
        this.state = {
            imageUrl: 'https://ws1.sinaimg.cn/large/610dc034ly1fgllsthvu1j20u011in1p.jpg'
        }
    }

    /**
     * 此页面调用顺序:
     * 1>render;
     * 2>componentDidMount;
     * 3>componentWillReceiveProps;
     * 4>render;
     */

    // 使用
    componentDidMount(){
        console.log('componentDidMount');
        // 使用backImage方法。
        this.props.backImage();  
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        // 最开始的值
        console.log(nextProps.beautyReducers);
        // 之前存储的值
        console.log(this.props.beautyReducers);

        const { navigate } = this.props.navigation;
        const { imageURL } = nextProps.beautyReducers;

        if (this.props.beautyReducers.imageURL !== imageURL){
            if (imageURL) {
                imageUri = imageURL;
            }
        }
    }

    render() {
        console.log('render');
        // 掉用过上面的方法后就可以通过打印`beautyReducers`获得需要的数据
        console.log(this.props.beautyReducers);
        const { beautyReducers } = this.props;
        return (
            <View style={styles.container}>
                <Image source={{uri: imageUri}}
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
        this.props.navigation.navigate('Beautypage', {
             // 回传过来的url
            callback: (data)=>{
                console.log(data); // 打印值为：'回调参数'
                // 实现一: 直接使用回调实现
                this.setState({
                    imageUrl: data
                });
                // 实现二: 在BeautyPage.js页面使用redux存值
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
