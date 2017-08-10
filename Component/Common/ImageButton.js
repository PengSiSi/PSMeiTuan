/**
 * Created by marno on 2017/4/9
 * Function: 可点击的 Image 组件
 * Desc:
 */
import React, {Component} from 'react';
import {Image, TouchableWithoutFeedback, Text} from 'react-native';

export default class ImageButton extends Component {
    render() {
        const {style, source, text} = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Image
                    style={this.props.style}
                    source={this.props.source}
                >
                <Text>添加文字</Text>
                </Image>
            </TouchableWithoutFeedback>
        )
    }
}