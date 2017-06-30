/**
 * Created by 思思 on 17/6/28.
 * 该库的使用参考博客: http://www.jianshu.com/p/8420b08062c7
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../../Config/Color';
import ImagePicker from 'react-native-image-crop-picker';
import AddImageContainerView from './../../../Common/AddImageContainerView';
import Space from './../../../Config/Space';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '发布分享', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
    } 

    render() {
        const { files } = this.state;
        return (
            <View style={styles.container}>
                <AddImageContainerView 
                    imageArr={files} 
                    style={styles.ImageContainerViewStyle}
                    pressAddImage={(index)=>this.pickerImagesAction()}
                    deleteImage={(index)=>this.deleteImageItemAction.bind(index)}
                    pressImage={(index)=>this.pressImageAction.bind(index)}>
                </AddImageContainerView>
            </View>

        );
    }

    // 选择多张图片
    pickerImagesAction() {
        ImagePicker.openPicker({
            multiple: true
            }).then(images => {
            this.setState({
                files:this.state.files.concat(images), // 数组拼接,这里注意依然保存上次选择的照片
            });
            console.log(images);
        });
    }

    // 删除图片
    deleteImageItemAction(index) {
        console.log('index'+index);
        alert('删除图片'+index);
    }

    // 点击图片放大查看
    pressImageAction(index) {
        alert('点击图片'+index);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    ImageContainerViewStyle: {
        width: Space.kScreenWidth - 20,
        margin: 20,
        height: 200,
        backgroundColor: 'gray'
    }
});