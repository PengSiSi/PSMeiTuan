
/**
 * Created by 思思 on 17/8/9.
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
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import SearchBar from './../../../Common/SearchBar';
import Space from './../../../Config/Space';
import Color from './../../../Config/Color';
import StorageUtil from './../../../Util/StorageUtil';

var dataArr = [];
var dataModel = {};

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
                i: 0,
            };
        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    compennetDidUnmount(){  
        // sqLite.close();  
   }  

   compennetWillUnmount() {
       console.log('compennetWillUnmount');
       StorageUtil.savaObject('searchHistoryData', this.state.dataSource);
   }

    componentWillMount(){  
        //开启数据库  
        // if(!db){  
        //     db = sqLite.open();  
        // }  
        // //建表  
        // sqLite.createTable();  
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
    this.dataArr = [];
    this.setState({
        dataSource: dataArr
    });
    // 注意: 这里不要使用bind
    this.get();
    // console.log(data.length);
  }  

    render() {
         const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <SearchBar style={styles.searchBarStyle} text='请输入搜索内容' onSubmit={(text)=>{
                        let model = {'id': this.state.i, 'text': text};
                        dataArr.push(model);
                        this.setState({
                            data: dataArr
                        });
                         //AsyncStorage 存储
                         // 使用JSON.stringify(text)存储值,取值时会带有""符号,直接存储就行
                        AsyncStorage.setItem('SP-'+ model.id + '-SP',text,function(err){
                            if (err) {
                                //TODO:存储出错
                                alert('存储出错');
                            }
                        });
                        console.log('存储成功');
                        this.setState({
                            i: this.state.i + 1
                        });
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
                <Text>{rowData.text}</Text>
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

    //保存数据
    save() {
        // alert('保存数据');
        //设置多项
        var keyValuePairs = [['text', this.state.dataSource]]
        // AsyncStorage.multiSet(keyValuePairs, function(errs){
        // if(errs){
        //     //TODO：存储出错
        //     console.log()
        //     return;
        // }
        // alert('数据保存成功!');
        // });
        AsyncStorage.setItem('text',this.state.dataSource,(error) =>{
            if (error) {
                console.log(error);
                return;
            }
            console.log('数据保存成功!');
        });
    }

    get() {
        // alert('取得数据');
       var _that = this;
        AsyncStorage.getAllKeys(function(err,keys){
            if (err) {
                //TODO:存储取数据出错
                //如果发生错误，这里直接返回（return）防止进入下面的逻辑
            }
 
            AsyncStorage.multiGet(keys,function(errs,result){
                //TODO:错误处理
                //得到的结果是二维数组
                //result［i］［0］表示我们存储的键，result［i］［1］表示我们存储的值
                var arr = [];
                for(var i in result){
                    let model = {'id': i, 'text': result[i][1]}
                    arr.push(model);
                }
                console.log(arr);
                this.dataArr = arr;
                _that.setState({
                    data: this.dataArr
                });
            });
        })
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