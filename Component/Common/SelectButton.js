/**
 * 登录页--自动登录按钮封装
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
export default class EditView extends Component {

    static defaultProps = {
        imageName: '',  // 图片名
        onPressCallback: null,
        selectedFlag: false,
    };

    constructor(props) {
        super(props);
        console.log('SelectButton constructor', this.props.selectedFlag);
        this.state = {
            selectedFlag: this.props.selectedFlag  // 是否选中状态
        };
    }

    render() {
        // 这里判断不能使用props,因为上面接收props赋值给state,这里使用state判断
        // 注意根据状态改变图片只能这样,否则识别不了图片
        var iconName = this.state.selectedFlag ? require('./../Images/Mine/click.png') : require('./../Images/Mine/not_click.png');
        return (
            <TouchableOpacity onPress={() => {
                this.selelctButtonDidClick()
            }} style={styles.containStyle}>
                <Image source={iconName} style={styles.selectImgStyle}></Image>
                <Text style={styles.textStyle}>
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }

    selelctButtonDidClick() {
        this.setState({selectedFlag: !this.state.selectedFlag});
        this.props.onPressCallback(this.state.selectedFlag);
    }
}

const styles = StyleSheet.create({

    containStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    selectImgStyle: {
        width: 15,
        height: 15,
        margin: 3,
        alignSelf: 'center'  // 设置两个子控件对齐,先设置父级属性为row
    },
    textStyle: {
        fontSize: 15,
        color: 'black',
        marginLeft: 10,
        alignSelf: 'center'
    }
});