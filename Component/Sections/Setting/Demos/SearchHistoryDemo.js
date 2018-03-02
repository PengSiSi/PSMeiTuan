
/**
 * Created by 思思 on 17/8/9.
 * // 安卓运行错误: http://blog.csdn.net/shenshibaoma/article/details/53171606
 * // 搜索历史Demo
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

import SearchBar from './../../../Common/SearchBar';
import Space from './../../../Config/Space';
import Color from './../../../Config/Color';
import SQLite from './../../../Util/SQLite';

var sqlite = new SQLite();

var dataArr = [];

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '历史搜索', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        this.state = {
                data: [],
            };
        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    compennetDidUnmount(){  
        sqLite.close();  
   }  

    componentWillMount(){  
        //开启数据库  
        if(!db){  
            db = sqLite.open();  
        }  
        //建表  
        sqLite.createTable();  
        /*
        //删除数据  
        sqLite.deleteData();  
        //模拟一条数据  
        var userData = [];  
        var user = {};  
        user.name = "张三";  
        user.age = "28";  
        user.sex = "男";  
        user.phone = "18900001111";  
        user.email = "2343242@qq.com";  
        user.qq = "111222";  
        userData.push(user);  
        //插入数据  
        sqLite.insertUserData(userData);  
        //查询  
        db.transaction((tx)=>{  
        tx.executeSql("select * from user", [],(tx,results)=>{  
            var len = results.rows.length;  
            for(let i=0; i<len; i++){  
            var u = results.rows.item(i);  
            //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
            alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);  
            }  
        });  
        },(error)=>{//打印异常信息  
        console.log(error);  
        });  
    */
  }  

    render() {
         const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <SearchBar style={styles.searchBarStyle} text='请输入搜索内容' onSubmit={(text)=>{
                        console.log(text);
                        dataArr.push(text);
                        this.setState({
                            data: dataArr
                        });
                        console.log(dataArr.length);
                    }
                }/>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.data)}
                    renderRow={this.renderRow}
                    style={{height: Space.kScreenHeight - 64, marginTop: 10}}
                    // renderFooter={this.renderFooter}
                    renderHeader={this.renderHeader}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                />
            </View>
        );
    }

    // 具体的每行
    renderRow(rowData, sectionID, rowID, highlightRow) {
        return(
            <View style={styles.cellStyle}>
                <Text>{rowData}</Text>
                <TouchableHighlight onPress={this.deleteItem.bind(this,rowID)}>
                   <Image source={require('./../../../Images//Setting/contacts_groupinfo_rename_delete@2x.png')}></Image>
                </TouchableHighlight>
            </View>
        );
    }

    // 头视图
    renderHeader() {
        let views = this.state.data.length > 0 ? 
           <View style={{margin: 10}}>
                <Text>历史搜索</Text>
            </View>
            :
            <View></View>
        return(
            // 注意: 这里不要写{},直接返回就可以
            views
        );
    }

    // cell删除
    deleteItem(rowID) {
        // alert(rowID);
        dataArr.splice(rowID,1);
        this.setState({
           data: dataArr 
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBarStyle: {
        width: Space.kScreenWidth - 20,
        marginTop: 10
    },
    cellStyle: {
        flex:1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});