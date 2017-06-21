/**
 * Created by 思思 on 17/5/7.
 */
import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SpaceView from './../../Common/SpaceView';

// HomeGridItem类
class HomeGridItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {info} = this.props;
        let title = info.maintitle
        let color = info.typeface_color
        let subtitle = info.deputytitle
        // 字符串的替换
        let imageUrl = info.imageurl.replace('w.h', '120.0')
        return(
            <TouchableOpacity style={styles.containerItem} onPress={this.props.onPress}>
                <View>
                    <Text style={{ color: color, marginBottom: 10 }}>{title}</Text>
                    <Text>{subtitle}</Text>
                </View>
                <Image style={styles.icon} source={{ uri: imageUrl }}></Image>
            </TouchableOpacity>
        );
    }
}

export default class HomeGridView extends PureComponent {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        infos: []
    }

    static state = {

    }

    render() {
        return(
            <View style={styles.container}>
                {this.props.infos.map((info, index) => (
                    <HomeGridItem
                        info={info}
                        key={index}
                        style={styles.containerItem}
                        onPress={()=>this.props.onGridSelected(info)} />
                ))}
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderLeftWidth:0.5,
        borderColor: Color.kSeparatorColor,
        backgroundColor: 'white',
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Space.kScreenWidth / 2-1,  // 注意: 如果父视图宽度不够是会进行换行的
        height: Space.kScreenWidth / 4,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: Color.kSeparatorColor
    },
    icon: {
        width: Space.kScreenWidth / 5,
        height: Space.kScreenWidth / 5,
    }
});