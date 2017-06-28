'use strict';
/*
    参考博客: http://blog.csdn.net/u012760183/article/details/53764033
*/

import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RNHighScores extends React.Component {

  render() {
    // 这里是使用Xcode那边传过来的数据进行构建组件
     var content = this.props['NameDict'].map(
       name=><Text key = {name.name}>{name.name}:{name.value}{'\n'}</Text>
     );
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>
          跳转过来啦...嘻嘻!
        </Text>
        <Text style={styles.scores}>    
          iOS嵌套ReactNative是不是成功了呢??
        </Text>
        <Text style={styles.scores}>    
          {content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// 整体js模块的名称
// AppRegistry.registerComponent('RNHighScores', () => RNHighScores);