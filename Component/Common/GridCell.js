import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class GridCell extends Component {

    // 定义相关属性类型
    static PropTypes = {
        badgeStyle: View.propTypes.style,
        backgroundColor: View.propTypes.style,
        title: PropTypes.string.isRequired,
        padding: PropTypes.number,
        renderImage: PropTypes.func,
        clickAction: PropTypes.func,
        // 两种类型都可以
        badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

     // render外部传递的组件
     renderImage(props) {
         if (this.props.renderImage) {
             // 这里将引用外部renderImage方法
             return React.cloneElement(this.props.renderImage,props);
         }
         return null;
     }

    render() {
        const {title, renderImage, padding, badgeText, clickAction} = this.props;
        return (
            <TouchableOpacity
                style={[{
                    paddingTop: 40,
                    paddingBottom: 40,
                    paddingLeft: 54,
                    paddingRight: 54,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }, this.props.badgeStyle]}
                onPress={() => {
                    clickAction();
                }} activeOpacity={0.6}
            >
                <View style={[styles.container, this.props.backgroundColor]}>
                    <View style={{alignSelf: 'center'}}>
                        {
                            badgeText ?
                                <View style={styles.badgeIcon}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 11,
                                            backgroundColor: 'transparent',
                                        }}
                                    >{badgeText}</Text></View>
                                : <View style={styles.badgeNull} />
                        }
                    {/*this.renderImage(this.props)*/}
                    <Image source={this.props.iconName}
                        style={styles.icon}>
                    </Image>
                    </View>
                    <Text
                        style={{
                            marginTop: padding,
                            fontSize: 15,
                            color: 'white',
                            backgroundColor: 'transparent',
                            alignSelf: 'center',
                        }}
                    >{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    badgeIcon: {
        backgroundColor: 'red',
        width: 18,
        height: 18,
        alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'center',
        position: 'relative',
        top: 6,
        right: -12,
    },
    badgeNull: {
        width: 18,
        height: 18,
        alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'center',
        position: 'relative',
        top: 6,
        right: -12,
    },
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    icon: {
        width: 25,
        height: 25
    }
});