import React from 'react'; 
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    ActivityIndicator, ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';

const TYPES = ['slide', 'fade', 'none'];

export default class PopView extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            visible: false
        };
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
            <View style={styles.contentStyle}>
               {/* {this.renderTitleView()}
                {this.renderTableView()}
            {this.renderBottomButtonView()}*/}
            <Text></Text>
            </View>
        );
    }

    renderTitleView() {
        return (
            <View>
            </View>
        );
    }

    renderTableView() {
        return (
            <View>
            </View>
        );
    }

    renderBottomButtonView() {
        return (
            <View>
            </View>
        );
    }

     static defaultProps = {
         title: '', // 标题
         cancleBtn: undefined,  // 取消按钮
         confirmBtn: undefined  // 确认按钮
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

     }

     // 取消按钮被点击
     cancleBtnClicked = ()=> {

     }
}

const styles = StyleSheet.create({  
  container:{  
    flex:1,  
    backgroundColor: '#ECECF0',  
  },  
  // modal的样式  
  modalStyle: {  
    // backgroundColor:'#ccc',  
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
    flex:1,  
    height:44,  
    alignItems: 'center',  
    justifyContent:'center',  
  },  
  // 竖直的分割线  
  verticalLine:{  
    width:0.5,  
    height:44,  
    backgroundColor:'#ccc',  
  },  
  buttonText:{  
    fontSize:16,  
    color:'#3393F2',  
    textAlign:'center',  
  }, 
  contentStyle: {
      backgroundColor: 'green'
  } 
});  
