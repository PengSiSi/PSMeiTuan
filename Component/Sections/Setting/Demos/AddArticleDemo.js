/**
 * Created by 思思 on 17/8/9.
 * 添加文章页面
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Modal,
    TouchableHighlight,
    TextInput
} from 'react-native';

import ImageButton from './../../../Common/ImageButton';
import AddArticelBottmView from './../Views/AddArticleBottomView';
import Space from './../../../Config/Space';
import Color from './../../../Config/Color';
import AddArticelCell from './../Views/AddArticleCell';
import AddArticelImageCell from './../Views/AddArticleImageCell';

var dataArr = [];
var dataModel = {};
var currentEditRowID = 0;  // 当前编辑的ID
var currentText = '';

export default class extends Component {

    static navigationOptions = ({
        navigation,
        screenProps
    }) => ({
        headerTitle: '添加文章',
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center' // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: '#06C1AE' // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    // 初始化模拟数据
    constructor(props) {
            super(props);

            // 初始状态
            //  state里不要保存数据源 直接放数组  数据源在render里声明
            this.state = {
                data: [],
                modalVisible: false
            };
            this.renderRow = this.renderRow.bind(this);
        }

        // Modal显示还是隐藏
        setModalVisible(visible) {
            this.setState({modalVisible: visible});
        }
        // 视图消失的时候清空数据源
        // componentWillUnmount() {
        //     dataArr = [];
        //     this.setState({
        //        dataSource: this.state.dataSource.cloneWithRows(dataArr)
        //     });
        // }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    {this.renderEditView()}
                </Modal>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.data)}
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

    // 编辑内容
    renderEditView() {
        return(
            <View style={{margin: 20}}>
                <View style={styles.container}>
                    <View 
                        style={{backgroundColor: Color.kMainColor, height: 44, alignItems: 'center',justifyContent:'center'}}>
                        <Text style={{alignItems: 'center'}}>输入编辑内容</Text>
                    </View>
                    <TextInput
                        style={{height: 80, borderColor: 'gray', borderWidth: 1, marginTop: 20}}
                        // defaultValue={'请输入编辑内容'}
                        placeholder={'请输入编辑内容'}
                        maxLength={200}
                        multiline={true}
                        onChangeText={(text) => {
                            console.log(text);
                            currentText = text;
                        }
                    }
                        value={this.state.text}
                    />
                    <View style={{height: 40, backgroundColor: Color.kMainColor, marginTop: 20, justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={{textAlign:'center',width: 60}}
                              onPress={() => {
                                // 更新数据源
                                console.log(currentEditRowID, currentText);
                                // 修改数组index的值
                                let temp = dataArr[currentEditRowID];
                                temp.data = currentText;
                                temp.type = "text";
                                dataArr[currentEditRowID] = temp;
                                this.setState({text: currentText,data: dataArr})
                                this.setModalVisible(!this.state.modalVisible)
                        }}>
                            完成
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    // 具体的每行
    renderRow(rowData, sectionID, rowID, highlightRow) {
        let cell = rowData.type === 'text' ? <AddArticelCell style={styles.cellStyle} 
                deleteAction={this.deleteAction.bind(this, rowID)} 
                editAction={this.editAction.bind(this, rowID)}
                content={rowData.data}>
          </AddArticelCell> : <AddArticelImageCell style={styles.cellStyle}></AddArticelImageCell>
        return cell;
    }

    // 添加文字
    pressAddText() {
        dataModel = {
            data: '标题标题',
            type: 'text'
        };
        dataArr.push(dataModel);
        this.setState({
            data: dataArr
        });
    }

    // 添加图片
    pressAddImage() {
        dataModel = {
            data: '1',
            type: 'image'
        };
        dataArr.push(dataModel);
        this.setState({
            data: dataArr
        });
        // alert('addImage');
    }

    // 添加卡券
    pressAddCard() {
        alert('addCard');
    }

    // 文本cell删除
    deleteAction(rowID) {
        this.setState({
            data: this.removeItem(rowID)
        });
    }
    
    // 删除
    removeItem(index) {
        let data = this.state.data;
        // for (var i = 0; i < data.length; i++) {
        //     if (i == index) {
                data.splice(index, 1);
            // }
        // }
        return data;
    }

    // 文本cell编辑
    editAction(rowID) {
        // alert('edit');
        currentEditRowID = rowID;
        this.setModalVisible(true)
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
        padding: 10,
        marginTop: 10
    },
    editViewStyle: {
        width: Space.kScreenWidth - 20,
        height: 200,
        backgroundColor: 'gray',
        margin: 10,
        justifyContent: 'center'
    }
});