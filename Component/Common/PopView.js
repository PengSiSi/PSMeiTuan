import React from 'react'; 
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    ActivityIndicator, 
    ViewPropTypes,
    ListView,
    TouchableHighlight
} from 'react-native';

import PropTypes from 'prop-types';

const TYPES = ['slide', 'fade', 'none'];
const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
});

export default class PopView extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: ds.cloneWithRows([
                '1.选择一',
                '2.选择2',
                '3.选择3',
                '4.选择4',
                '5.选择5',
                '6.选择6',
                '7.选择7',
                '8.选择8',
                '9.选择9',
                '10.选择10',
            ]),
            selectedText: ''
         
    };
    
    this.renderRow = this.renderRow.bind(this);
    }

     // 加载完成  
    componentDidMount(){  
        //  
    }  
    
    // view卸载  
    componentWillUnmount(){  
        //  
    }  

    render() {
        return (
            /**
             * // Modal属性  
                // 1.animationType bool  控制是否带有动画效果  
                // 2.onRequestClose  Platform.OS==='android'? PropTypes.func.isRequired : PropTypes.func  
                // 3.onShow function方法  
                // 4.transparent bool  控制是否带有透明效果  
                // 5.visible  bool 控制是否显示  
             */
            <Modal  
            animationType='slide'  
            transparent={true}  
            visible={this.state.visible}  
            onShow={() => {}}  
            onRequestClose={() => {}} > 
            {this.renderContentView()}
            </Modal>  
        );
    }

    renderContentView() {
        return (
            <TouchableOpacity style={styles.modalStyle}>
                <View style={styles.contentStyle}>
                 {/*标题*/}
                   <View style={{height: 30, margin: 10}}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>请选择</Text>
                    </View>
                   {/* {this.renderTableView()}
                    {this.renderBottomButtonView()}*/}
                     {/*列表*/}
                    <View style={{height: 300, width: 300}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>
                     {/*底部按钮*/}
                    {/*{this.renderBottomButtonView()}*/}
                    <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={styles.buttonStyle} >
                      <Text style={styles.buttonText} onPress={()=>{
                        //   alert('点击了取消');
                          this.hide();
                      }}>取消
                      </Text>
                      </View>
                      <View style={styles.buttonStyle}>
                       <Text style={styles.buttonText} onPress={()=>{
                        //   alert('点击了确定');
                        this.hide();
                      }}>确定
                      </Text>
                      </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderTitleView() {
        return (
            <View style={{height: 30, margin: 10}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>请选择</Text>
            </View>
        );
    }

    renderTableView() {
        return (
        <View style={{flex: 1, height: 300}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        </View>
        );
    }

    renderRow(rowData) {
        return (
            // 传值注意:这样是接收不到值的 onPress={(rowData)=>this.didSelectItem(rowData,this)}
            <TouchableOpacity onPress={()=>this.didSelectItem(rowData,this)}>
                <View style = {styles.cellStyle}>
                    <Text style = {styles.cellTextStyle}>
                    {rowData}
                    </Text>
                </View>
            </TouchableOpacity>
        )
  }

  didSelectItem(rowData) {
    //   alert(rowData)
    this.setState({
        selectedText: rowData,
    });
    this.hide();
  }

    renderBottomButtonView() {
        return (
           <View style={styles.buttonView}>  
                 <TouchableHighlight underlayColor='transparent'  
                   style={styles.buttonStyle}  
                   onPress={this.hide()}>  
                   <Text style={styles.buttonText}>  
                     取消  
                   </Text>  
                 </TouchableHighlight>  
                 <TouchableHighlight underlayColor='transparent'  
                   style={styles.buttonStyle}  
                   onPress={this.confiremBtnClicked()}>  
                   <Text style={styles.buttonText}>  
                     确定  
                   </Text>  
                 </TouchableHighlight>  
            </View>  
        );
    }

     static defaultProps = {
         title: '', // 标题
         cancleBtn: '',  // 取消按钮
         confirmBtn: ''  // 确认按钮
     }

     // 显示
     show = ()=> {
         this.setState({
             visible: true
         });
     } 

     // 隐藏
     hide = ()=> {
         this.setState({
             visible: false
         });
     }

     // 确定按钮被点击
     confiremBtnClicked = ()=> {
         this.hide();
     }

     // 取消按钮被点击
     cancleBtnClicked = ()=> {
         this.hide();
     }
}

const styles = StyleSheet.create({  
  container:{  
    flex:1,  
    backgroundColor: '#ECECF0',  
  },  
  // modal的样式  
  modalStyle: {  
    backgroundColor:'rgba(0, 0, 0, 0.5)',  
    alignItems: 'center',  
    justifyContent:'center',  
    flex:1,  
  },  
  // modal上子View的样式  
  subView:{  
    marginLeft:60,  
    marginRight:60,  
    backgroundColor:'#fff',  
    alignSelf: 'stretch',  
    justifyContent:'center',  
    borderRadius: 10,  
    borderWidth: 0.5,  
    borderColor:'#ccc',  
  },  
  // 标题  
  titleText:{  
    marginTop:10,  
    marginBottom:5,  
    fontSize:16,  
    fontWeight:'bold',  
    textAlign:'center',  
  },  
  // 内容  
  contentText:{  
    margin:8,  
    fontSize:14,  
    textAlign:'center',  
  },  
  // 水平的分割线  
  horizontalLine:{  
    marginTop:5,  
    height:0.5,  
    backgroundColor:'#ccc',  
  },  
  // 按钮  
  buttonView:{  
    flexDirection: 'row',  
    alignItems: 'center',  
  },  
  buttonStyle:{  
    height:30,
    width: 60, 
    alignItems: 'center',  
    justifyContent:'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth 
  },    
  buttonText:{  
    fontSize:16,  
    color:'black',  
    textAlign:'center',  
  }, 
  contentStyle: {
      backgroundColor: 'white',
      width: 300,
      height: 400,
  },
 // cell
  cellStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#666',
    flexDirection: 'row',
    padding: 10
  },
  cellTextStyle: {
    fontSize: 17,
    textAlign: 'center'
  }
});  
