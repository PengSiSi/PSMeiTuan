/**
 * Created by 思思 on 17/7/3.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
    ProgressBarAndroid,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import { connect } from 'react-redux';
import {fetchBeautyGirlData} from './../../../Redux/Actions/BeautifulGirlAction';
import Color from './../../../Config/Color';
import Space from './../../../Config/Space';
import NavigationItem from './../../../Common/NavigationItem';

class BeautyPage extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '照片墙', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight: (
        <NavigationItem
            icon={require('./../../../Images/Setting/ic_refresh.png')}
            onPress={() => {
                // this.componentWillMount();
                alert('刷新');
            }}
        />
    ),
    }); 

    constructor(props) {
        super(props);
        this.state = {
          progressValue: new Animated.Value(0)
        };
    }

    componentWillMount(){
      //InteractionManager.runAfterInteractions(() => {
        const {dispatch} = this.props;
        dispatch(fetchBeautyGirlData());
    //  });
   }

    componentDidMount() {
        Animated.timing(this.state.progressValue, {
            toValue: Space.kScreenWidth,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    render() {
        const { beautyReducers } = this.props;

        return (
            <View style={styles.container}>
                <Animated.View style = {{height: 2, backgroundColor: '#27B5EE', width: this.state.progressValue}}>
                </Animated.View>
                <ScrollView>
                    <View style = {{flexDirection : 'row'}}>
                    <View>
                        {this.getImages(beautyReducers.beauty.slice(0, 6), navigator)}
                    </View>
                    <View>
                        {this.getImages(beautyReducers.beauty.slice(6, 12), navigator)}
                    </View>
                    </View>
                </ScrollView>
            </View>

        );
    }

    // 设置图片
    getImages(items) {
        return (
            items.map((item, i) => {
                return (
                    <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>this.onImageClick(item)}>
                        <Image  key = {i+'_'+item._id} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(Space.kScreenWidth-8)/2}} source = {{uri :item.url}}>
                        </Image>
                    </TouchableOpacity>
                );
            })
        );
    }

    // 点击图片
    onImageClick(item) {
        // alert(item.url);
        const {navigate,goBack,state} = this.props.navigation;
        // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.callback(item.url);
        goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    iconImage: {
        width: 20,
        height: 20
    }
});

/*
export default connect((state) => {
    const {BeautyReducers} = state;
    return {
        BeautyReducers
    }
}, { beautyAction })(BeautyPage)

*/


function mapStateToProps(state) {
  const { beautyReducers } = state;
  return {
    beautyReducers
  }
}
export default connect(mapStateToProps)(BeautyPage);
