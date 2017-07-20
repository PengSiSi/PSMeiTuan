/**
 * Created by 思思 on 17/5/7.
 * 注意: 这里下拉选择的Demo和无网络展示的view共用一个页面,这里区分下this.state.isRenderEmptyOrFailView即可

 */
import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Color from './../../../Config/Color';
import DropDown from './../../../Common/DropDown';
import EmptyOrFailView from './../../../Common/EmptyOrFailView';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
const DEMO_OPTIONS_2 = [{
  "name": "Rex",
  "age": 30
}, {
  "name": "Mary",
  "age": 25
}, {
  "name": "John",
  "age": 41
}, {
  "name": "Jim",
  "age": 22
}, {
  "name": "Susan",
  "age": 52
}, {
  "name": "Brent",
  "age": 33
}, {
  "name": "Alex",
  "age": 16
}, {
  "name": "Ian",
  "age": 20
}, {
  "name": "Phil",
  "age": 24
}, ];

export default class extends Component {

  static navigationOptions = ({
    navigation,
    screenProps
  }) => ({
    headerTitle: '下拉筛选选择Demo',
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center' // 设置安卓端导航栏标题不居中显示
    },
    headerStyle: {
      backgroundColor: Color.kMainColor // 设置导航栏的背景颜色,headerTintColor设置无效
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      selectText: '', // 下拉选择的值
      isRenderEmptyOrFailView: false
    };
  }

  render() {
    var views = [];
    return (
        this.state.isRenderEmptyOrFailView ?
         <View style={styles.container}>
                <DropDown style={{flex: 1, width: 200}}
                            options={DEMO_OPTIONS_1}
                            dropdownStyle={{width: 200}}>
                    <View style={{flexDirection: 'row',justifyContent:'center',alignItems: 'center', marginTop: 50}}>
                        <Text>选择吧</Text>
                        <Image source={require('./../../../Images/Setting/ss_ic_timepre@2x.png')}></Image>
                    </View>
                </DropDown>
                <DropDown style={{flex: 1, width: 200}}
                            options={DEMO_OPTIONS_1}
                            onSelect={(idx, value) => this.dropdownOnSelect(idx, value)}>
                    <Text>{this.state.selectText || '请选择'}</Text>
                </DropDown>
           </View>
           :
           this.renderEmptyOrFailView()
    );
  }

  renderEmptyOrFailView() {
      return (
        <EmptyOrFailView emptyOrFailTip='网络崩溃啦!' subTitle='点击重新加载哟' reLoadData={this.reloadData.bind(this)}>
        </EmptyOrFailView>
      );
  }

    reloadData() {
        alert('重新加载');
    }

    // 下拉选择
    dropdownOnSelect(idx, value) {
        // alert(value);
        this.setState({
            selectText: value,
        });
    }

  dropDownView() {
    alert('弹出');
  }

  // 下拉选择
  dropdownOnSelect(idx, value) {
    // alert(value);
    this.setState({
      selectText: value,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
});