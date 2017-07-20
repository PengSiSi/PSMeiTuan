/**
 * Created by 思思 on 17/5/7.
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
  TouchableOpacity,
  Image
} from 'react-native';

import Color from './../../../Config/Color';
import Space from './../../../Config/Space';
import PersonJson from './../../../Resource/Person.json';
import Button from './../../../Common/Button';
import NavigationItem from './../../../Common/NavigationItem';

var selectedItem;  // 当前所有的选择的
export default class extends Component {
  static navigationOptions = ({
    navigation,
    screenProps
  }) => ({
    headerTitle: 'List实现多选',
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
    },
    headerStyle: {
      backgroundColor: Color.kMainColor // 设置导航栏的背景颜色,headerTintColor设置无效
    },
    headerRight:(
        <NavigationItem
            title='完成'
            // 这里注意: static里面不能使用this调用方法,出现clickFinishButton is not function
            // 参考博客: http://www.jianshu.com/p/2f575cc35780
            onPress={()=>navigation.state.params.navigatePress()}
            // onPress = {()=>this.clickFinishButton()}
        />
    )
  });

  constructor(props) {
    super(props);
    //此代码是核心,不这样,数据不显示
    this.data = PersonJson;
    this.state = {
      dataArr:PersonJson,
      selectItem: [],
    };
  }

  render() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <ListView
          dataSource={ds.cloneWithRows(this.state.dataArr)}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections
      />
    );
  }
  
  _renderRow(rowData) {
    let selelctIcon = rowData.isSelected ? require('./../../../Images/Mine/click@2x.png') : require('./../../../Images/Mine/not_click@2x.png');
    return (
      // 注意调用this问题,否则出现this.setstate is not a function错误...
      <TouchableOpacity onPress={this.didClickSelect.bind(this,rowData)}>
        <View style = {styles.cellStyle}>
          <Image source={selelctIcon} style={styles.iconButtonStyle}/>
          <Text style = {styles.cellTextStyle}>
            {rowData.studentName}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  componentWillMount() {

  }

  componentDidMount(){
    // 处理数据源
    this.handlerDataSource();
    this.props.navigation.setParams({navigatePress:this.clickFinishButton})
  }

  // 处理数据源数据,添加isSelected标示
  handlerDataSource() {
    var tempArr = [];
    for (var index in this.state.dataArr) {
      var element = this.state.dataArr[index];
      element.isSelected = false;
      tempArr[index] = element;
    }
    // 注意: 重新setState,渲染视图
    this.setState({dataArr:tempArr});
  }

  // 点击每一行
  didClickSelect(rowData) {
    var _this = this;
    // alert(this.state.selectItem.length);
    let array = this.state.dataArr.slice();
    let item = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].studentId === rowData.studentId) {
        if (array[i].isSelected) {  // 选中
          array[i].isSelected = false;
            item = this.removeByValue(this.state.selectItem,array[i].studentId);
            if(!item){
                item = [];
            }
        } else {
          array[i].isSelected = true;
          item = this.state.selectItem.concat(array[i]);
        }
      }
    }
    this.state.dataArr = array;
    // 赋给外面的全局变量,传递出去
    selectedItem = item;
    _this.setState({selectItem:item});
  }

  // 点击完成按钮
  clickFinishButton = ()=> {
      alert(selectedItem.length);
    //   let data = this.state.dataArr;
    //   let selectResultArr = [];
    //   for (var index in data) {
    //         var element = object[index];
    //         if (element.isSelected) {
    //             selectResultArr.push(element);
    //         }
    //   }
    //   alert(selectResultArr.length);
  }

  // 从数组删除元素
  removeByValue=(arr, val) =>{
        if(arr.length>0){
            for(var i=0; i<arr.length; i++) {
                if(arr[i].studentId === val) {
                // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。
                 return arr.splice(i, 1);
                }
            }
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
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#666',
    flexDirection: 'row',
    padding: 10
  },
  iconButtonStyle: {
    marginLeft: 10,
  },
  cellTextStyle: {
    marginLeft: 20,
    fontSize: 17,
    textAlign: 'center'
  }
});