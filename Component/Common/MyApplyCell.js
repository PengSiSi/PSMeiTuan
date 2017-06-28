/**
 * Created by 思思 on 17/5/7.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import Separator from './../Common/Separator';
import Color from './../Config/Color';
import Space from './../Config/Space';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.titleTipStyle}>{this.props.title}</Text>
                <TextInput style = {styles.inputStyle} placeholder={this.props.placeholder}
                           onChangeText={(text) => this.props.onChangeText({text})}
                           editable={this.props.editable}
                           value={this.props.value}>
                </TextInput>
                <TouchableOpacity style={{width: 30, height: 30, alignItems: 'center',flexDirection: 'row'}}
                                  onPress={this.props.onPress}
                >
                    <Image source={this.props.iconName}></Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleTipStyle: {
       fontSize: 15, 
       borderRightColor: 'gray',
       borderRightWidth: StyleSheet.hairlineWidth,
       width: Space.kScreenWidth * 0.2
    },
    inputStyle: {
        fontSize: 15, 
        width: Space.kScreenWidth * 0.5,
        marginLeft: 10
    }
});