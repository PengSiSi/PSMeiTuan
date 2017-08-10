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

var dataArr = [];
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


     render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
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
    renderRow(rowData) {
        return(
            // <View style={styles.cellStyle}>
            //      <Text>{rowData}</Text>
            // </View>
            <AddArticelCell></AddArticelCell>
        );
    }

    pressAddText() {
        alert('addText');
        dataArr.push('1');
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(dataArr)
        });
    }

    pressAddImage() {
        alert('addImage');
    }

    pressAddCard() {
        alert('addCard');
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