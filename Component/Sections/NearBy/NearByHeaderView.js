//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class NearByHeaderView extends PureComponent {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        // titles: [],
        selectedIndex: 0
    }

    static state = {

    }

    render() {
        return(
            <View style={styles.container}>
                {this.props.titles.map((title,i)=>{
                    <TouchableOpacity
                        style={[{ backgroundColor: this.props.selectedIndex == i ? '#FE566D' : 'white' }, styles.item]}
                        key={i}
                        onPress={() => this.props.onSelected(i)}>
                        <Text
                            style={{ color: this.props.selectedIndex == i ? 'white' : '#555555' }}>
                            {this.props.titles[i]}
                        </Text>
                    </TouchableOpacity>
                })}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: Color.kBgColor
    },
    item: {
        width: Space.kScreenWidth / 4 - 10,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Color.kSeparatorColor,
    },
});
