/**
 * Created by 思思on 17/6/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    NativeModules,
    InteractionManager
} from 'react-native';

import Color from './../../Config/Color';

var Push = NativeModules.PushNative;

export default class extends Component {

  static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '封装组件Demo', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        '1.ScrollableTabViewSDemo',
        '2.ListView多选实现',
        '3.日历的使用',
        '4.我的申请页面',
        '5.跳转到iOS原生页面',
        '6.antd-mobile的简单使用'
      ])
    };
    this.renderRow = this.renderRow.bind(this);
  }

    render() {
    return (
      <View style={{flex: 1}}>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
      return(
          <View style = {styles.cellStyle}>
            <Text style = {styles.cellTextStyle} 
                  onPress = {this.pushToNextPage.bind(this,rowData, sectionID,rowID, highlightRow)}>{rowData}
            </Text>
          </View>
      )
  }

  // push操作
  pushToNextPage(rowData, sectionID, rowID, highlightRow) {
    switch (rowID) {  // 注意switch里rowID需要比较的是字符串
        case '0': {
           this.props.navigation.navigate('ScrollTabViewPage')
            break;
        }
        case '1': {
          this.props.navigation.navigate('MultipleSelectedPage')
            break;
        }
        case '2': {
          this.props.navigation.navigate('CalendarPage')
            break;
        }
        case '3': {
          this.props.navigation.navigate('MyApplyPage')
          break;
        }
        // 跳转到iOS原生页面
        case '4': {
          InteractionManager.runAfterInteractions(()=> {
            // RNOpenOneVC这个也是写在原生里面的再PushNative中哦~
            Push.RNOpenOneVC('测试');
          });
          break;
        }
        case '5': {
          this.props.navigation.navigate('AntdMobilePage')
          break;
        }
        default:
            break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // cell
  cellStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#666',
    flexDirection: 'row',
    padding: 10
},
  cellTextStyle: {
      fontSize: 17,
      textAlign: 'center'
}
});
