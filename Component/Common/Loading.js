/**
 * 数据请求前显示"加载中..."
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import HardCode from './../Config/HardCode'


export default class Loading extends React.Component {

    static defaultProps = {
        isShow: React.PropTypes.bool
    }

    render() {
        if (!this.props.isShow) return null;

        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator color="white"/>
                    <Text style={styles.loadingTitle}>加载中...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})