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
      headerTitle: '2018学习Demo集合',
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
          '1.占位图的实现'
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
            this.props.navigation.navigate('DefaultImageDemo')
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