/**
 * 首页详情导航栏
 */
import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	TouchableOpacity
} from 'react-native';

import Space from './../../';

var headHeight = Platform.OS === 'ios' ? 64 : 54;
var childViewW = Space.kScreenWidth / 3;

export default class NavigaionBar extends Component {

	static defaultProps = {
		isHomePage: false,
		popToHomeList: null,
		pushToDownLoadListPage: null,
		title: '',
		rightItemTitle: ''
	};

	render() {
		var iconName = this.props.isHomePage ? require('../../Images/drawer_icon.png') : require('./../../Images/return_icon.png');
		return (
			<View style={styles.container}>
              <View style={styles.navContainerStyle}>
				<View style = {styles.childView}>
					<TouchableOpacity onPress = {()=>{this.popToHomeList()}}>
                    	<Image source = {iconName} style = {styles.backItemStyle}></Image>
                	</TouchableOpacity>
				</View>
				<View style = {[styles.childView,{justifyContent:'center'}]}>
					<Text style = {styles.titleStyle}>{this.props.title}</Text>
				</View>
               <View style = {[styles.childView,{justifyContent:'flex-end'}]}>
					<Text style = {styles.rightItemStyle} onPress = {()=>{this.pushDownLoadListPage()}}>{this.props.rightItemTitle}</Text>
				</View>
              </View>
            </View>
		);
	}

	pushDownLoadListPage() {
		if (this.pushDownLoadListPage == null) {
			return;
		}
		this.props.pushDownLoadListPage();
	}

	popToHomeList() {

		if (this.props.popToHomeList == null) {
			console.log('222');
			return;
		}
		this.props.popToHomeList();
	}
}

const styles = StyleSheet.create({
	container: {
		// 设置下面的线
		borderBottomWidth: 0.5,
		borderColor: 'gray',
		height: headHeight,
		backgroundColor: 'green',
	},
	navContainerStyle: {
		flexDirection: 'row',
		marginTop: Platform.OS === 'ios' ? 20 : 10,
		alignItems: 'center',
		height: headHeight - 20
	},
	childView: {
		width: childViewW,
		alignItems: 'center',
		flexDirection: 'row'
	},
	backItemStyle: {
		marginLeft: 10,
	},
	titleStyle: {
		fontSize: 17,
		color: 'white',
		fontWeight: 'bold',
	},
	rightItemStyle: {
		marginRight: 10,
		color: 'white',
		fontSize: 17
	}
});