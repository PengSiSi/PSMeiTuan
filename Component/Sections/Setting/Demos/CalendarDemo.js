/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    发现
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});