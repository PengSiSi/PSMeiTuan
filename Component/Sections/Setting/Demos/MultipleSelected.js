/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'List实现多选', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        //此代码是核心,不这样,数据不显示
        this.data = PersonJson;
        this.state = {
            dataSource: ds.cloneWithRows(this.data),  // 数据源
            selectItem:[],
        };
        this.renderRow = this.renderRow.bind(this);
        // this.didClickSelect = this.didClickSelect.bind(this);
    }

    render() {
        return (
           <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections
           />
        );
    }

    renderRow(rowData) {
      let selelctIcon = rowData.isSelected
                        ? require('./../../../Images/Mine/click@2x.png')
                        : require('./../../../Images/Mine/not_click@2x.png');
      return(
          // 注意调用this问题,否则出现this.setstate is not a function错误...
          <TouchableOpacity onPress={this.didClickSelect.bind(rowData,this)}>
            <View style = {styles.cellStyle}>
                <Image source={selelctIcon}
                       style={styles.iconButtonStyle}>
                </Image>
                <Text style = {styles.cellTextStyle}>
                {rowData.studentName}
                </Text>
            </View>
          </TouchableOpacity>
      )
  }

    componentDidMount() {
        // 处理数据源
        this.handlerDataSource();
        this.setState = ({
            dataSource: ds.cloneWithRows(this.data)
        });
    }

    handlerDataSource() {
        for (var index in this.data) {
            var element = this.data[index];
            element.isSelected = false;
            console.log('dataSource'+element);
        }
    }

    componentWillUnmount() {

    }

    didClickSelect = (rowData)=> {
        // alert(rowData.studentName);
        alert(this.state);
        let array = this.data.slice();
        let item=[];
        for (let i = 0; i < array.length; i++) {
                if (array[i].studentId === rowData.studentId) {
                   if(array[i].isSelected){
                       array[i].isSelected = false;
                   } else{
                       array[i].isSelected = true;
                   }
                }
                console.log( array[i].isSelected);
        }
        this.data = array;

        this.setState({
            selectItem:[],
            dataSource: ds.cloneWithRows(this.data),
        });
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
    borderBottomWidth: 1/PixelRatio.get(),
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