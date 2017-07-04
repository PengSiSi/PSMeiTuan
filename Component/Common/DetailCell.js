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
        const { avatarImgName, tipTitle, subTitle, tagsArray, rightImageName} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <Image source={avatarImgName} style={styles.avatarImageStyle}>
                </Image>
                <View style={{flex: 1,flexDirection: 'column',marginLeft: 10,justifyContent: 'flex-start'}}>
                     <Text style={styles.titleTipStyle}>
                        {tipTitle}
                    </Text>
                    <Text style={styles.subTitleStyle}>
                        {subTitle}
                    </Text>
                    <View style={{marginTop: 10}}>
                    {this.renderTagsView()}
                    </View>
                </View>
                <View style={{marginRight: 10, marginBottom: 10, width: 60,flexDirection: 'column', alignItems: 'flex-end',justifyContent: 'flex-end'}}>
                    <Image source={rightImageName} style={styles.rightImageStyle}>
                    </Image>
                </View>
            </TouchableOpacity>
        );
    }

    renderTagsView() {
        let tagsViews = [];
        const { tagsArray } = this.props;
        return(
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
                tagsArray.map((item, index)=> {
                    return (
                      <Text style={styles.tagItemStyle} key={index}>
                      {item}
                      </Text>  
                    );
                })
            }
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
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatarImageStyle: {
        marginLeft: 5,
        marginTop: 0,
        width: 40,
        height: 40
    },
    titleTipStyle: {
       fontSize: 15,
       color: 'black',
       marginLeft: 10,
       marginBottom: 5,
       textAlign: 'left'
    },
    subTitleStyle: {
        fontSize: 15,
        color: 'gray',
        marginRight: 30,
        marginTop: 10,
        textAlign: 'left'
    },
    rightImageStyle: {
        width: 25,
        height: 25,
    },
    tagItemStyle: {
        borderColor: 'green',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 10
    }
});
