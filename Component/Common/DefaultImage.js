// 参考博客： https://www.jianshu.com/p/052e6e15aede

import React, { Component } from 'react'
import { View, Image,Platform, StyleSheet } from 'react-native'

export default class DefaultImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDefault: true,
        }
    }

    render() {
        // imageName表示占位图片名，source表示图片名，style表示样式
        const {source, style, imageName} = this.props;
        return (
            this.state.showDefault
            ? 
            <View style={styles.container}>
                <Image style={style} source={imageName} resizeMode='cover'/>
                <Image style={{width:1,height:1}} source={source} onLoadStart={() => this.setState({showDefault: true})} onLoad={() => this.setState({showDefault: false})}/>
            </View>
            : 
            <Image style={style} source={source}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});