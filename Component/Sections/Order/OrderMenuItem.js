import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class OrderMenuItem extends PureComponent {
    render() {
        return(
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Text>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Space.kScreenWidth / 4,
        height: Space.kScreenWidth / 5,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5,
    }
});