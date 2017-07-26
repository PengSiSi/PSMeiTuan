/**
 * BaseCommon
 * 公共逻辑处理
 */
import React, {Component} from 'react';
import {
    BackHandler,
    StyleSheet,
    Text
} from 'react-native';

export default class BaseCommon {
    constructor(props) {
        this._onHardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }
    componentDidMount() {
        if(this.props.backPress)BackHandler.addEventListener('hardwareBackPress',this._onHardwareBackPress);
    }
    componentWillUnmount() {
        if(this.props.backPress)BackHandler.removeEventListener('hardwareBackPress',this._onHardwareBackPress);
    }
    onHardwareBackPress(e){
        return this.props.backPress(e);
    }

    render() {
        return (
            <View styles={styles.container}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        fontSize: 18,
        color: 'green',
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})
