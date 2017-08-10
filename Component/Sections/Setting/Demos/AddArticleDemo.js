/**
 * Created by 思思 on 17/8/9.
 * 添加文章页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

import ImageButton from './../../../Common/ImageButton';
import AddArticelBottmView from './../Views/AddArticleBottomView';
import Space from './../../../Config/Space';
import Color from './../../../Config/Color';
import AddArticelCell from './../Views/AddArticleCell';
import AddArticelImageCell from './../Views/AddArticleImageCell';

var dataArr = [];
var dataModel = {};

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '添加文章', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: '#06C1AE'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
     // 初始状态
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
        this.renderRow = this.renderRow.bind(this);
  }
    // 视图消失的时候清空数据源
    // componentWillUnmount() {
    //     dataArr = [];
    //     this.setState({
    //        dataSource: this.state.dataSource.cloneWithRows(dataArr)
    //     });
    // }
  
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={{height: Space.kScreenHeight - 64}}
                    // renderFooter={this.renderFooter}
                    // renderHeader={this.renderHeader}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.isRefreshing}
                    //         onRefresh={this.onRefresh}
                    //         colors={['rgb(217, 51, 58)']}
                    //     />
                    // }
                />
                <View style={styles.addArticelBottmViewStyle}>
                    <AddArticelBottmView 
                        pressAddText={this.pressAddText.bind(this)}
                        pressAddImage={this.pressAddImage.bind(this)}
                        pressAddCard={this.pressAddCard.bind(this)}>
                    </AddArticelBottmView>
                </View>
            </View>
        );
    }

     // 具体的每行
    renderRow(rowData, sectionID, rowID, highlightRow) {
        let cell = rowData.type === 'text' 
        ? <AddArticelCell style={styles.cellStyle} 
                deleteAction={this.deleteAction.bind(this, rowID)} 
                editAction={this.editAction.bind(this)}>
          </AddArticelCell>
        : <AddArticelImageCell style={styles.cellStyle}></AddArticelImageCell>
        return cell;
    }

    // 添加文字
    pressAddText() {
        dataModel = {data: '1', type: 'text'};
        dataArr.push(dataModel);
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(dataArr)
        });
    }

    // 添加图片
    pressAddImage() {
        dataModel = {data: '1', type: 'image'};
        dataArr.push(dataModel);
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(dataArr)
        });
        // alert('addImage');
    }
    
    // 添加卡券
    pressAddCard() {
        alert('addCard');
    }

    // 文本cell删除
    deleteAction(rowID) {
        alert(rowID);
    }

    removeItem(index) {
        let data = this.state.dataSource;
        for (var i = 0; i < data.length; i++) {
            if (i == index) {
                data.splice(i, 1);
            }
        }
        return data;
    }

    // 文本cell编辑
    editAction(rowData, sectionID, rowID, highlightRow) {
        alert('edit');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    addArticelBottmViewStyle: {
        position: 'absolute',
        width: Space.kScreenWidth,
        height: 44,
        bottom: 0,
        right: 0
    },
    cellStyle: {
        flex: 1,
        padding: 10
    }
});