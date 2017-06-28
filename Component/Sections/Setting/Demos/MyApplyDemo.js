/**
 * Created by 思思 on 17/5/7.
 * 开发文档:  https://mobile.ant.design/docs/react/introduce
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';

import Color from './../../../Config/Color';
import Space from './../../../Config/Space';
import MyApplyCell from './../../../Common/MyApplyCell';
import Picker from 'react-native-picker';
import { DatePicker } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('08:30 +0800', 'HH:mm Z').utcOffset(8);
const defaultDate = moment().locale('zh-cn').utcOffset(8);
const gmtNow = moment().utcOffset(0);

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的申请', 
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
            applyReason: '',
            applyDate: '',
            date: '',
            dpValue: null,
            visible: false,
        };
    }

    onChange = (value) => {
        this.setState({ value });
  }

    render() {
        return (
            // scrollView滑动的时候Picker隐藏
            <ScrollView style={styles.container} onScroll={()=>{Picker.hide()}}>
                <MyApplyCell iconName ={require('./../../../Images/Setting/pubilc_cbb@2x.png')} 
                             placeholder='请选择教室'
                             onPress={()=>{alert('选择教室')}}
                             title='申请教室'
                             editable={false}
                             > 
                </MyApplyCell>
                <MyApplyCell iconName ={require('./../../../Images/Setting/ss_ic_timepre@2x.png')} 
                             placeholder='请选择日期' 
                             value={this.state.applyDate}
                             editable={false}
                             onPress={()=>{
                                //  alert('选择日期')
                                this.showDatePicker()
                                }
                            }
                             title='申请日期'>
                </MyApplyCell>
                <MyApplyCell placeholder='请输入事由' 
                             title='申请事由'
                              editable={true}
                             onChangeText={(text)=>{this.setState({applyReason: text})}}
                             >
                </MyApplyCell>
               <DatePicker
                    defaultDate={defaultDate}
                    value={this.state.value}
                    mode="date"
                    minDate={this.date1MinDate || (this.date1MinDate = moment('2015-08-06', 'YYYY-MM-DD'))}
                    maxDate={this.date1MaxDate || (this.date1MaxDate = moment('2016-12-06', 'YYYY-MM-DD'))}
                    onChange={this.onChange}
                    format={val => val.fromNow()}
                >
                    <MyApplyCell iconName ={require('./../../../Images/Setting/ss_ic_timepre@2x.png')} 
                             placeholder='请选择使用时间' 
                             editable={false}
                             onPress={()=>{alert('选择使用时间')}}
                             title='使用时间'>
                    </MyApplyCell>
                </DatePicker>
                <MyApplyCell iconName ={require('./../../../Images/Setting/pubilc_cbb@2x.png')} 
                             placeholder='请选择部门' 
                             editable={false}
                             onPress={()=>{alert('选择部门')}}
                             title='使用部门'>
                </MyApplyCell>
            </ScrollView>
        );
    }

    _createDateData() {
        let date = [];
        for(let i=1950;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择日期',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                // 注意返回的选择的日期是数组,这里使用数组转字符串
                // this.setState({applyDate: pickedValue[0]+pickedValue[1]+pickedValue[2]});
                // this.setState({applyDate: pickedValue.toString()}); // 这样会把,也拼接在一起
                
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    // 点击返回按钮,Picker消失
    componentWillUnmount() {
        Picker.hide();
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});