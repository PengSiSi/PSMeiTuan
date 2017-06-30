/**
 * Created by 思思 on 17/6/29.
 * 注意:如果你在iOS端运行出现错误: Cnanot read property 'getPhotos' of undefined
 * 
 * 解决办法:
 * 1>要链接 RCTCameraRoll 库。进入到工程项目中的 node_module/react-native/Libraries/CameraRoll
 * 2>在 Build Phases -> Link Binary With Libraries 里添加 libRCTCameraRoll.a
 * 3>由于苹果安全策略更新，还需要在 Info.plist 配置请求照片相的关描述字段（Privacy - Photo Library Usage Description）
 * 
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../../Config/Color';
import { ImagePicker, WhiteSpace } from 'antd-mobile';

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
      files2: [],
    };
  }

  handleFileChange = (files) => {
    this.setState({
      files,
    });
  }

  handleFile2Change = (files2) => {
    this.setState({
      files2,
    });
  }

  render() {
    return (
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <ImagePicker
          onChange={this.handleFile2Change}
          files={this.state.files2}
        />
      </View>
    );
  }

    pickImageAction() {
        alert('选择照片');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});