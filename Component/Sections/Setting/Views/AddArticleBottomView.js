/**
 * Created by 思思 on 17/8/9.
 * 添加文章底部的View
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

import Space from './../../../Config/Space';
import ImageButton from './../../../Common/ImageButton';

export default class  extends Component {
    render() {
        return (
            <View style={styles.container}>
            <TouchableHighlight onPress={this.props.pressAddText}>
                <View style={{flexDirection: 'row'}}>
                    
                        <Image style={styles.imageStyle} 
                                source={require('./../../../Images/Home/icon_homepage_map_selected.png')}
                                onPress={this.props.pressAddText}>
                        </Image>
                        <Text style={styles.textStyle}>添加文字</Text>
                </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={this.props.pressAddImage}>
                    <View style={{flexDirection: 'row'}}>
                    <Image style={styles.imageStyle} 
                                source={require('./../../../Images/Home/icon_homepage_map_selected.png')}
                                onPress={this.props.pressAddText}>
                    </Image>
                    <Text style={styles.textStyle}>添加图片</Text>
                    </View>
                  </TouchableHighlight>
                   <TouchableHighlight onPress={this.props.pressAddCard}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.imageStyle} 
                                        source={require('./../../../Images/Home/icon_homepage_map_selected.png')}
                                        onPress={this.props.pressAddText}>
                            </Image>
                            <Text style={styles.textStyle}>添加卡券</Text>
                        </View>
                </TouchableHighlight>

            </View>
        );
    }

    onPress(titile) {
        // alert('文字');
        // switch (titile) {
        //     case '文字':
        //         this.pr.callBack('')
        //         break;
        
        //     default:
        //         break;
        // }
        this.props.callBack(titile);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 44,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageStyle: {
        width: 25,
        height: 25,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 14,
        alignSelf: 'center'
    }
});