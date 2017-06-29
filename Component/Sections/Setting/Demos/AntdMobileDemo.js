/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import MyCell from './../../../Common/MyApplyCell';
import { DatePicker, List, InputItem } from 'antd-mobile';
// import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Color from './../../../Config/Color';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('08:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;
const Brief = Item.Brief;

export default class extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'antd-mobile使用', 
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
            date: zhNow,
            classRoomName: '',
            startTime: '',
            endTime: ''
       }
    }

    onChange = (date) => {
      this.setState({
         date: date
      });
  }

    render() {
        // console.log('dpValue'+this.state.dpValue);
        return (
           <ScrollView>
            <List>
                <DatePicker mode="date" 
                            minuteStep={5} 
                            onChange={this.onChange} 
                            value={this.state.date}
                            // extra="请选择(可选)"  // extra和value是不能同时使用
                >
                     <Item arrow="horizontal" onClick={() => {}}><Text style={{fontSize: 15, color: 'red'}}>申请日期</Text></Item>
                </DatePicker>
            <InputItem placeholder="请输入教室名称" onChange= {(val)=>this.setState({classRoomName: val})}><Text>教室名称</Text></InputItem>
            <Item extra='请选择审核状态'>审核状态</Item>
            <DatePicker mode="time" 
                            minuteStep={5} 
                            onChange={(time)=> {this.setState({startTime: time})}}  
                            value={this.state.startTime}
                            // extra="请选择(可选)"  // extra和value是不能同时使用
                >
                     <Item arrow="horizontal" onClick={() => {}}><Text style={{fontSize: 15, color: 'red'}}>开始时间</Text></Item>
                </DatePicker>
                <DatePicker mode="time" 
                            minuteStep={5} 
                            onChange={(time)=> {this.setState({endTime: time})}} 
                            value={this.state.endTime}
                            // extra="请选择(可选)"  // extra和value是不能同时使用
                >
                     <Item arrow="horizontal" onClick={() => {}}><Text style={{fontSize: 15, color: 'red'}}>结束时间</Text></Item>
                </DatePicker>
            </List>
           </ScrollView>
        );
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