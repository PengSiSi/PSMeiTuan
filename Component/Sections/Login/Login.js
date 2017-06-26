/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    StatusBar,
    BackHandler,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loading from './../../Common/Loading';
import SelectButton from './../../Common/SelectButton';
import Space from './../../Config/Space';
import Color from './../../Config/Color';
import NavigationItem from './../../Common/NavigationItem';
import StorageUtil from './../../Util/StorageUtil';
import Constant from './../../Config/Constant';
import HardCode from './../../Config/HardCode';

export default class extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '登录', 
        headerTitleStyle: {
            color: 'black'
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        // 子页面设置了左边的按钮,上一个页面push过来的自带的左侧按钮会被覆盖.
        headerLeft: (
            <View style={{ flexDirection: 'row' }}>
                <NavigationItem
                    icon={require('./../../Images/Mine/close.png')}
                    onPress={() => {
                        // alert('关闭');
                        const {navigate,goBack,state} = navigation;
                        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
                        state.params.callback('回调参数');
                        goBack();
                    }}
                />
            </View>
        ),
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <NavigationItem
                    title='登录'
                    onPress={() => {
                        navigation.goBack();
                        // alert('登录');
                    }}
                />
            </View>
        ),
    }); 

     constructor(props) {
        super(props);
        this.state = {
            userName: "", // 用户名
            password: "", // 密码
            rememberPassword: false, // 记住密码
            autoLogin: false, // 自动登录
            showLoading: false,
        }
    }

    render() {
        return (
            <ScrollView style = {{backgroundColor:'white'}} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                {/*logo*/}
                <StatusBar
                    backgroundColor='#ff0000'
                    translucent={true}
                    hidden={true}
                    animated={false}
                />
                <View>
                    <Image source={require('./../../Images/Home/bg_customReview_image_default.png')} resizeMode='center' style={styles.imgStyle}>
                    </Image>
                </View>
                {/*账户,密码*/}
                <View style={[styles.item, styles.editViewStyle]}>
                    <Image source={require('./../../Images/Mine/account.png')} style={styles.iconImageStyle}></Image>
                    <Text style={styles.textStyle}>账户 /</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref="inputLoginName"
                        underlineColorAndroid="transparent"
                        maxLength={90}
                        // placeholder = HardCode.kInputUserName
                        placeholder='请输入用户名'
                        clearTextOnFocus={false}
                        // clearButtonMode="while-editing"
                        style={{flex: 1}}
                        defaultValue={this.state.userName}
                        onChangeText={(input) => this.setState({userName: input})}/>
                </View>
                <View style={styles.item}>
                    <Image source={require('./../../Images/Mine/password.png')} style={styles.iconImageStyle}></Image>
                    <Text style={styles.textStyle}>密码 /</Text>
                    <TextInput
                        ref="inputLoginPwd"
                        underlineColorAndroid="transparent"
                        placeholder='请输入密码'
                        // placeholder= HardCode.kInputPassword
                        clearTextOnFocus={false}
                        // clearButtonMode="while-editing"
                        style={{flex: 1}}
                        defaultValue={this.state.password}
                        onChangeText={(input) => this.onPasswordTextChanged(input)}
                        secureTextEntry={true}/>
                </View>
                {/*记住密码,自动登录*/}
                <View style={styles.selectButtonsStyle}>
                    <SelectButton name='记住密码' 
                                  selectedFlag={this.state.rememberPassword}
                                  imageName={this.state.rememberImgName}
                                  onPressCallback={(flag) => {
                                    //   alert(flag);
                                      this.remenberPasswordClick(flag)
                                  }}>
                    </SelectButton>
                    <View style={styles.lineViewStyle}>
                    </View>
                    <SelectButton name='自动登录' 
                                  selectedFlag={this.state.autoLogin}
                                  imageName={this.state.autoLogginimgName}
                                  onPressCallback={(flag) => {
                                      this.autoLogginClick(flag)
                                  }}>
                    </SelectButton>
                </View>
                {/*登录按钮*/}
                <TouchableHighlight style={styles.login}
                                    // underlayColor='transparent'
                                    underlayColor = {Color.kMainColor}
                                    onPress={() => this.login()} style={styles.loginButtonView}>
                    <Text style={styles.loginText}>登 录</Text>
                </TouchableHighlight>
                <Loading isShow={this.state.showLoading}/>
            </View>
            </ScrollView>
        )
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
    };

    // 记住密码
    remenberPasswordClick(flag) {
        this.setState = ({
            rememberPassword: flag
        });
    }

    // 自动登录
    autoLogginClick(flag) {
        this.setState = ({
            autoLogin: flag
        });
    }

    onPasswordTextChanged(password) {
        this.setState({password: password});
    }

    login() {
        if (this.state.userName.length < 1) {
            alert(HardCode.kNoUserName);
            return;
        }
        if (this.state.password.length < 1) {
            alert(HardCode.kNoPassword);
            return;
        }
        this.setState({
            showLoading: true
        });
        var userName = this.state.userName;
        var passWord = this.state.password;
        if (userName === 'sisi' && passWord === '123') {
            //登陆成功后将用户名密码保存至Storage和常量类
            StorageUtil.savaObject(Constant.kUserNameKey, userName);
            StorageUtil.savaObject(Constant.kPasswordKey, passWord);
            Constant.kUserName = userName;
            Constant.kPassWord = passWord;
            //将记住密码和是否自动登录保存至Storage
            // StorageUtil.savaObject(Constant.kAutoLoginKey, true);
        }
        setTimeout(()=>{
            this.setState({
            showLoading: false
        });
        // 这里模拟登录数据请求,登录成功实现返回
        alert('登录成功');
        const { navigation } = this.props;
        navigation.goBack();
        }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // 图片style
    imgStyle: {
        flexDirection: 'row',
        marginTop: Space.kScreenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        fontSize: 16,
        color: 'black',
        marginRight: 10
    },
    // 登录按钮
    login: {
        height: 40,
        backgroundColor: Color.kMainColor,
        margin: 20,
        justifyContent: 'center',
    },
    // 登录文字
    loginText: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#FFF',
        borderRadius: 5
    },
    loginButtonView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        height: 50,
        backgroundColor: Color.kMainColor,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImageStyle: {
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10
    },
    editViewStyle: {
        marginTop: 30,
        justifyContent: 'center',
    },
    selectButtonsStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    selectItemStyle: {
        width: 100,
        margin: 30,
        justifyContent: 'center',
    },
    lineViewStyle: {
        width: StyleSheet.hairlineWidth,
        height: 20,
        backgroundColor: 'gray',
        margin: 0,
        justifyContent: 'center',
    }
})