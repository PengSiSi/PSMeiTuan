/**
 * Created by 思思 on 17/6/17.
 * 
<Button
    title='立即抢购'
    style={{ color: 'white', fontSize: 18 }}
    containerStyle={styles.buyButton}
/>
 */

import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// create a component
export default class Button extends PureComponent {

    static propTypes = {
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
        style: Text.propTypes.style,
        containerStyle: View.propTypes.style,
        title: PropTypes.string,
        activeOpacity: PropTypes.number,
    }

    static defaultProps = {
        onPress:() => {},
        disabled: false,
        activeOpacity: 0.8
    }

    render() {
        let { onPress, disabled, style, containerStyle, title, activeOpacity } = this.props
        return (
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                <Text style={style}>
                    {title}
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
    },
});
