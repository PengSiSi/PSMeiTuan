/**
 * Created by 思思 on 17/6/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import SelftabBar from './../../../Common/SelfTabBar';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TempList from './../../Setting/Demos/TempList';
import Color from './../../../Config/Color';

var tabNames = ['通知一', '通知二'];

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'ScrollableTabViewSDemo', 
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props){
        super(props);
        this.state = {
            titleList : [
                {'name':'党建园地', 'id':'0',},
                {'name':'公务通知', 'id':'1',}
            ],
        }
    }

    render() {
        return (
            <ScrollableTabView
                locked = {true}
                renderTabBar ={() =>
                    <SelfTabBar tabHeight={43}
                                tabNames={this.state.titleList}
                                activeTextColor = {'rgb(99,113,142)'}
					            inactiveTextColor = {'rgb(112, 112, 112)'}/>}
                tabBarUnderlineStyle = {{height:1.5,backgroundColor:'rgb(100,119,162)'}}
            >
                {this.state.titleList.map((data,i) =>{
                    return(
                        <Temp key={data}
                               tabLabel={data.name}
                               type={data.id}
                               defaultValue = {''}
                               navigator = {this.props.navigator} />
                    )
                })}
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});