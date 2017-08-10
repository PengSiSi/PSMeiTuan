/**
 * Created by 思思 on 17/8/9.
 * 添加文章Cell
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Space from './../../../Config/Space';
import Color from './../../../Config/Color';
import Separator from './../../../Common/Separator';
import Button from './../../../Common/Button';

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.contentTextStyle} numberOfLines={0}>
                        就是你的事觉得男生觉得男生丹尼斯克电脑上开电脑得男生丹尼斯克电脑上开电脑得男生丹尼斯克电脑上开电脑
                    </Text>
                </View>
               
               {/*<Separator style={{marginTop: 10}}/>*/}
               <View style={{height: 0.5,backgroundColor: Color.kSeparatorColor}}></View>
               <View style={styles.buttonContainerStyle}>
                    <Button title={'删除'} style={styles.buttonStyle} onPress={this.props.deleteAction}></Button>
                    <Button title={'编辑'} style={styles.buttonStyle} onPress={this.props.editAction}></Button>
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',  // 这个不能写,否则控件不能包含关系
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        borderRadius: 5,
        margin: 10
    },
    contentTextStyle: {
        padding: 10,
    },
    buttonContainerStyle: {
        flex: 1,
        height: 30,
        margin: 10,
        flexDirection: 'row-reverse'
    },
    buttonStyle: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        borderRadius: 5,
        width: 50,
        textAlign: 'center',
        marginLeft: 5
    }
});