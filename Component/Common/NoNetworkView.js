
/**
 * 无网络时加载的视图组件
 */
import React,{ Component } from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue
        };
    }

    render() {
        let {width, height} = this.props
        return (
            <View style={[styles.container, {
                width: width,
                height: height,
            }]}>
                <View style={styles.picBlock}>
                    <Image source={styles.picUrl}/>
                </View>
                <View style={styles.textBlock}>
                    <Text style={styles.text}>你的网络好像不给力</Text>
                    <Text style={styles.text}>点击按钮刷新</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.props.onClickRefresh}>
                    <Text style={styles.buttonText}>刷新</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        height: 20,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    },
    buttonText: {
        height: 30,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        padding: 5
    },
    button: {
        width: 100,
        height: 20,
        borderRadius: 10,
        borderColor: 'gray'
    }
});
