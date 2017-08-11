/**
 * Created by 思思on 17/6/22.
 */
import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
  NativeModules,
  InteractionManager,
  Platform,
  Alert
} from 'react-native';

import Color from './../../Config/Color';
import PopView from './../../Common/PopView';
import {
  toastShort
} from './../../Util/ToastUtils';

var Push = NativeModules.PushNative;

export default class extends Component {

  static navigationOptions = ({
    navigation,
    screenProps
  }) => ({
    headerTitle: '封装组件Demo',
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center' // 设置安卓端导航栏标题不居中显示
    },
    headerStyle: {
      backgroundColor: Color.kMainColor // 设置导航栏的背景颜色,headerTintColor设置无效
    },
  });

  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        '1.ScrollableTabViewSDemo',
        '2.ListView多选实现',
        '3.日历的使用',
        '4.我的申请页面',
        '5.跳转到iOS原生页面',
        '6.antd-mobile的简单使用',
        '7.Gride封装组件',
        '8.添加选择多张图片',
        '9.Antd-Mobile选择照片',
        '10.redux学习',
        '11.页面实现两个ListView',
        '12.Mobx学习',
        '13.Mobx实现购物车例子',
        '14.时间线实现',
        '15.下拉菜单隐藏',
        '16.自定义Modal展示选择',
        '17.下拉筛选选择',
        '18.测试页面的复用',
        '19.Video播放视频',
        '20.aurora-imui-Demo',
        '21.历史搜索实现',
        '22.动态添加文章',
        '23.Echarts的使用'
      ])
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount(props) {
    toastShort('加载成功');
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      <PopView 
        ref={(ref)=>this.popView = ref}
        // Modal弹出选择的值
        selectItem = {
          (data) => this._selectItem(data)
    }

        >
      </PopView>
      </View>
    );
  }
  _selectItem(data){
    console.log(data);
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style = {styles.cellStyle}>
            <Text style = {styles.cellTextStyle} 
                  onPress = {this.pushToNextPage.bind(this,rowData, sectionID,rowID, highlightRow)}>{rowData}
            </Text>
          </View>
    )
  }

  // push操作
  pushToNextPage(rowData, sectionID, rowID, highlightRow) {
    switch (rowID) { // 注意switch里rowID需要比较的是字符串
      case '0':
        {
          this.props.navigation.navigate('ScrollTabViewPage')
          break;
        }
      case '1':
        {
          this.props.navigation.navigate('MultipleSelectedPage')
          break;
        }
      case '2':
        {
          this.props.navigation.navigate('CalendarPage')
          break;
        }
      case '3':
        {
          this.props.navigation.navigate('MyApplyPage')
          break;
        }
        // 跳转到iOS原生页面
      case '4':
        {
          if (Platform.OS === 'ios') {
            InteractionManager.runAfterInteractions(() => {
              // RNOpenOneVC这个也是写在原生里面的再PushNative中哦~
              Push.RNOpenOneVC('测试');
            });
            break;
          } else {
            Alert.alert(
                '注意',
                '这里只实现iOS端哟,安卓端待完善', [{
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed!')
                }, {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed!')
                }, ]
              )
              // 注意这要写break,否则,他会执行下面语句
            break;
          }
        }
      case '5':
        {
          this.props.navigation.navigate('AntdMobilePage')
          break;
        }
      case '6':
        {
          this.props.navigation.navigate('Gridpage')
          break;
        }
      case '7':
        {
          this.props.navigation.navigate('AddImagesPage')
          break;
        }
      case '8':
        {
          this.props.navigation.navigate('AntdPickerImagePage')
          break;
        }
      case '9':
        {
          this.props.navigation.navigate('ReduxDemoPage')
          break;
        }
      case '10':
        {
          this.props.navigation.navigate('ContactDemoPage')
          break;
        }
      case '11':
        {
          this.props.navigation.navigate('MobxDemoPage')
          break;
        }
      case '12':
        {
          this.props.navigation.navigate('CartMobxDemoPage')
          break;
        }
      case '13':
        {
          this.props.navigation.navigate('TimeLineDemoPage')
          break;
        }
         case '14':
        {
          this.props.navigation.navigate('EchartsDemo')
          break;
        }
// <<<<<<< HEAD
//         case '14': {
//           this.props.navigation.navigate('CellExpandDemoPage')
//           break;
//         }
//         case '15': {
//           // 自定义Modal展示选择
//           this.popView.show();
//           break;
//         }
//         default:
//             break;
// =======
      case '14':
        {
          this.props.navigation.navigate('ZXSportDemonPage')
          break;
        }
      case '15':
      {
        this.popView.show();
        break;
      }
      case '16':
      {
        this.props.navigation.navigate('DropDownDemo')
        break;
      }
      case '17':
      {
        this.props.navigation.navigate('TextDemo')
        break;
      }
      case '18':
      {
        this.props.navigation.navigate('VideoDemo')
        break;
      }
      case '19':
      {
        this.props.navigation.navigate('IMUIDemo')
        break;
      }
       case '20':
      {
        this.props.navigation.navigate('SearchHistoryDemo')
        break;
      }
       case '21':
      {
        this.props.navigation.navigate('AddArticelDemo')
        break;
      }
      case '22':
      {
        this.props.navigation.navigate('EchartsDemo')
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