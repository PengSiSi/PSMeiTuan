import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import Space from './../../Config/Space';
import Separator from './../../Common/Separator';

// create a component
class MineCell extends PureComponent {
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image} />
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={[styles.content, this.props.style]}>
                        {icon}
                        <Text>{this.props.title}</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Text style={{ color: '#999999' }}>{this.props.subtitle}</Text>
                        <Image style={styles.arrow} source={require('./../../Images/Public/cell_arrow.png')} />
                    </View>
                    <Separator />
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:'#ddd'
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    }
});

//make this component available to the app
export default MineCell;
