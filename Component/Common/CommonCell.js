/**
 * Created by 思思 on 17/7/4.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Separator from './../Common/Separator';
import Color from './../Config/Color';
import Space from './../Config/Space';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { imageName, title, subTitle, rightImageName} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Image source={imageName} style={styles.leftIconStyle}>
                    </Image>
                    <Text style={styles.titleTipStyle}>
                        {title}
                    </Text>
                </View>
                <View style={{marginRight: 10, flexDirection: 'row', width: 60,alignItems: 'center',justifyContent: 'flex-end',}}>
                    <Text style={styles.subTitleStyle}>{subTitle}
                    </Text>
                    <Image source={rightImageName} style={styles.rightImageStyle}>
                    </Image>
                </View>
            </TouchableOpacity>
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
        justifyContent: 'space-between',
    },
    leftIconStyle: {
        width: 30,
        height: 30,
        marginLeft: 0
    },
    titleTipStyle: {
       fontSize: 15,
       color: 'black',
       marginLeft: 10
    },
    subTitleStyle: {
        fontSize: 15,
        color: 'gray',
    },
    rightImageStyle: {
        marginLeft: 10
    }
});
