/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import MyCell from './../../../Common/MyApplyCell';
import { DatePicker, List, InputItem, Picker } from 'antd-mobile';
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
            endTime: '',
            status: '请选择状态'
       }
    }

    // 选择日期改变
    onChange = (date) => {
      this.setState({
         date: date
      });
    }

    onClick = (val) => {
    };

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
                <InputItem placeholder="请输入教室名称" labelNumber={5} extra='右边内容' 
                           onChange= {(val)=>this.setState({classRoomName: val})}
                        //    styles={styles.InputItemStyle} // 修改样式布局会乱
                        >
                           <Text>教室名称</Text>
                </InputItem>
               
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
                >
                     <Item arrow="horizontal" onClick={() => {}}><Text style={{fontSize: 15, color: 'red'}}>结束时间</Text></Item>
                </DatePicker>
            </List>
            {/*注意: 这里必须是这种样式*/}
             <Picker data={[{value:'审核中', label:'审核中'}, {value: '待审核', label: '待审核' }, {value: '已完成', label: '已完成'}]} cols={1} className="forss" 
                     onChange= {(val)=>{this.setState({status: val})}}
                     extra={this.state.status}>
                <List.Item arrow="horizontal" value={this.state.status}>选择状态</List.Item>
             </Picker>
           </ScrollView>
        );
    }

    pickStatus() {
        alert('选择状态');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    InputItemStyle: {
        fontSize: 15,
        color: 'red',
        flexDirection: 'row',
        marginLeft: 30
    }
});