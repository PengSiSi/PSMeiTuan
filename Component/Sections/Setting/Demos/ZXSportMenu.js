/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

var menuData = require('./MenuList');
var WillSportMenu = React.createClass({

  getInitialState() {
    return {
      selectedIndex: 0
    }
  },


  sectionPress(i, data) {
    var isOpened = data.isOpened;
    data.isOpened = !isOpened;
    this.setState({});
  },
  onPressInSection(i, data) {

  },
  onPressOutSection(i, data) {

  },

  cellPress(i, k, cellItem) {

  },
  onPressInCell(i, k, cellItem) {

  },
  onPressOutCell(i, k, cellItem) {

  },
  render() {

    var cellMenu = [];
    var menuDataList = menuData.sections;
    for (var i = 0; i < menuDataList.length; i++) {
      cellMenu.push(
        <TouchableOpacity
            activeOpacity = {0.75}
            key = {'section'+menuDataList[i].id}
            onPress = {this.sectionPress.bind(this,i,menuDataList[i])}
            onPressIn = {this.onPressInSection.bind(this,i,menuDataList[i])}
            onPressOut = {this.onPressOutSection.bind(this,i,menuDataList[i])}
          >
            <View style = {[{marginTop:5},{borderTopWidth:1},{borderBottomWidth:1},{alignItems:'center'},{flexDirection:'row'},{height:50},{justifyContent:'space-between'}]}>
              <Text style = {[{marginLeft:5}]}>{menuDataList[i].sectionName}</Text>
              <Text style = {[{marginRight:5}]}>{'本期已报名'+menuDataList[i].signPlayer+'人'}</Text>
            </View>

          </TouchableOpacity>
      );
      var cellItemList = menuDataList[i].items;
      for (var k = 0; k < cellItemList.length; k++) {

        cellMenu.push(menuDataList[i].isOpened ?
          <TouchableOpacity
            activeOpacity = {0.75}
            onPress = {this.cellPress.bind(this,i,k)}
            key = {cellItemList[k].title}
            onPressIn = {this.onPressInCell.bind(this,i,k,cellItemList[k])}
            onPressOut = {this.onPressOutCell.bind(this,i,k,cellItemList[k])}
          >
            <View style = {[{borderBottomWidth:1}]}>
              <View style = {[{marginLeft:5},{flexDirection:'row'},{marginTop:5},{justifyContent:'space-between'}]}>
                <Text>{cellItemList[k].title}</Text>
                <Text style = {[{marginRight:5}]}>{cellItemList[k].status}</Text>
              </View>
              <View style = {[{marginLeft:5},{alignItems:'center'},{flexDirection:'row'},{marginTop:5},{justifyContent:'space-between'}]}>
                <View>
                  <Text>{'报名周期：'+ cellItemList[k].signTime}</Text>
                  <Text>{'比赛周期：'+ cellItemList[k].sportTime}</Text> 
                </View>
                <Text style = {[{marginRight:5}]}>></Text>
              </View>
              <Text style = {[{marginLeft:5},{marginTop:5},{marginRight:5}]}>{'参赛人数'+cellItemList[k].players}</Text>
            </View>
          </TouchableOpacity> : null
        );
      }
    }
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets = {true}
        showsVerticalScrollIndicator = {false}>
        <View>
          <View style = {[{height:40},{flexDirection:'row'},{alignItems:'center'},{justifyContent:'space-between'}]}>
            <Text style = {{marginLeft:5}}>中国好股手一季赛制</Text>
            <View style = {[{marginRight:5},{height:25},{width:80},{backgroundColor:'green'},{alignItems:'center'},{justifyContent:'center'}]}>
              <Text style = {[{fontSize:10}]}>规则及奖励说明</Text>
            </View>
          
          </View>
        </View>

        {cellMenu}
      </ScrollView>
    );
  }
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  titleStyle: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'rgb(59, 66, 80)',
    justifyContent: 'center'
  },

});

module.exports = WillSportMenu;