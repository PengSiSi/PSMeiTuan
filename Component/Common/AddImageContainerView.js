/**
 * Created by 思思 on 17/5/7.
 * 
 * // 可以声明 prop 为指定的 JS 基本类型。默认
    // 情况下，这些 prop 都是可传可不传的。
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // 所有可以被渲染的对象：数字，
    // 字符串，DOM 元素或包含这些类型的数组。
    optionalNode: React.PropTypes.node,

    // React 元素
    optionalElement: React.PropTypes.element,

    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 指定的多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定形状参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 以后任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接
    // 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Space from '../Config/Space';
const imageWH = 80;
const imageSpace =  (Space.kScreenWidth - 4*imageWH)/8;

export default class extends Component {

     // 定义相关属性类型
    static PropTypes = {
        imageArr: View.propTypes.array,
    };

    render() {
        let views = [];
        console.log('space:'+imageSpace);
        const {imageArr} = this.props;
        let _this = this;

        return (
            <View style={{ width:Space.kScreenWidth,flexDirection:'row',flexWrap:'wrap'}}>
                {imageArr.map((data,i) =>{
                    return(
                        <View key={i} style={styles.imageItemStyle}>
                            <TouchableOpacity onPress={_this.pressImage.bind(_this, i)}>
                                <Image source = {{uri:data.path}} style={{width:imageWH,height:imageWH, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={_this.delImage.bind(_this, i)}>
                                        <Image source={require('./../Images/Setting/contacts_groupinfo_rename_delete@2x.png')}
                                            style={styles.deleteButtonStyle}>
                                        </Image>
                                    </TouchableOpacity>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                 <TouchableOpacity onPress={this.props.pressAddImage}>
                    <Image source={require('./../Images/Setting/djsq_picture_add@2x.png')} 
                           style={styles.imageItemStyle}>
                    </Image>
                 </TouchableOpacity>
            </View>
        );
    }

    delImage(index){
        this.props.deleteImage(index);
    }
    
    pressImage(index){
        this.props.pressImage(index)
        // alert('11');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageItemStyle: {
        width: imageWH,
        height: imageWH,
        backgroundColor: 'white',
        marginRight:imageSpace,
        marginLeft:imageSpace,
        marginTop:5,
        marginBottom:5
    },
    deleteButtonStyle: {
        width: 20,
        height: 20,
    },
});