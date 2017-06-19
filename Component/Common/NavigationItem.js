/**
 * Created by 思思 on 17/6/17.
 * 
 <NavigationItem
    title='福州'
    icon={require('../../img/Home/icon_navigationItem_message_white@2x.png')}
    titleStyle={{ color: 'white' }}
    iconStyle={{ color: 'white' }}
    onPress={() => {
    }}
 />
 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// create a component
export default class NavigationItem extends PureComponent {

   constructor() {
      super();

    };

    // 消除警告
    // static propTypes = {
    //     icon: React.PropTypes.element,
    //     title: React.PropTypes.string,
    //     iconStyle: React.PropTypes.style,
    //     titleStyle: React.PropTypes.style,
    //     onPress: React.PropTypes.func
    // };

   static defaultProps = {
        icon: '',
        /**注意:不能写这句,否则报错
         *  title: '',
         */
        iconStyle: {},
        titleStyle: {},
        onPress: null
    }
    
    render() {
        let icon = this.props.icon &&
            <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />

        let title = this.props.title &&
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {icon}
                {title}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 27,
        height: 27,
        margin: 8,
    },
    title: {
        fontSize: 15,
        color: '#333333',
        margin: 8,
    }
});