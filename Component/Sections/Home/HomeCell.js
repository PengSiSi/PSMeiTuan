/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class HomeCell extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {

    }

    static state = {

    }

    render() {

        let {info} = this.props;
        let imageUrl = info.imageUrl.replace('w.h', '160.0');
        return(
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{ uri: imageUrl }} style={styles.icon} />
                <View style={styles.rightContainer}>
                    <Text>{info.title}</Text>
                    <View>
                    </View>
                    <Text numberOfLines={0} style={{ marginTop: 8 }}>{info.subtitle}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={styles.price}>{info.price}元</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: Color.kSeparatorColor,
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: Color.kMainColor
    }
});

