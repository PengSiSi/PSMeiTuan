/**
 * Created by 思思 on 17/5/7.
 * https://github.com/wix/react-native-calendars
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import Color from './../../../Config/Color';
import Space from './../../../Config/Space';
import NavigationItem from './../../../Common/NavigationItem';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

export default class extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '日历的使用', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight:(
        <NavigationItem
            title='Agenda'
            // 这里注意: static里面不能使用this调用方法,出现clickFinishButton is not function
            // 参考博客: http://www.jianshu.com/p/2f575cc35780
            onPress={()=>navigation.state.params.navigatePress()}
            // onPress = {()=>this.clickFinishButton()}
        />
    )
    }); 

    // 初始化模拟数据
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        dataSource: ds.cloneWithRows([
            '通知一',
            '通知二',
            '通知三'
        ])
        };
        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.onDayPress = this.onDayPress.bind(this);
    }

    componentWillMount() {

  }

  componentDidMount(){
    this.props.navigation.setParams({navigatePress:this.clickFinishButton})
  }

  // 点击导航栏右侧按钮
  clickFinishButton = ()=> {
    //   alert('点击了...');
      this.props.navigation.navigate('AgendaScreen');
  }

  render() {
        return (
        <View style={{flex: 1}}>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderHeader={this.renderHeader}
            />
        </View>
        );
  }

    renderRow(rowData, sectionID, rowID, highlightRow) {
      return(
          <View style = {styles.cellStyle}>
            <Text style = {styles.cellTextStyle}>
            {rowData}
            </Text>
          </View>
      )
  }

    renderHeader() {
        return(
            <Calendar 
            // Initially visible month. Default = Date()
            current={'2017-06-27'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2022-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={this.onDayPress}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            style={styles.calendarStyle}
            theme={{
                calendarBackground: '#ffffff',
                textSectionTitleColor: 'gray',
                selectedDayBackgroundColor: 'red',
                selectedDayTextColor: 'white',
                todayTextColor: 'green',
                dayTextColor: 'black',
                textDisabledColor: '#d9e1e8',
                dotColor: 'green',
                selectedDotColor: 'red',
                arrowColor: 'black',
                monthTextColor: 'black'
            }}
            markedDates={{[this.state.selected]: {selected: true}}}
        //         markedDates={{
        //             '2017-06-27': {selected: true, marked: true},
        //             '2012-05-17': {marked: true},
        //             '2017-06-29': {disabled: true}
        // }}
        />
        );
    }

    // 点击某一天的实现
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  // cell
  cellStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#666',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white'
},
  cellTextStyle: {
      fontSize: 17,
      textAlign: 'center'
},
calendarStyle: {
    width: Space.kScreenWidth,
    height: 300,
    // 设置分割线
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
}
});