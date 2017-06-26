'use strict';

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Animated
} from 'react-native';

class SelfTabBar extends Component {

	static propTypes = {
		goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array,// 保存Tab名称
		tabHeight:React.PropTypes.number,
		activeTextColor: React.PropTypes.string,
		inactiveTextColor: React.PropTypes.string
	}

	setAnimationValue({value}) {
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	}

	renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? this.props.activeTextColor : this.props.inactiveTextColor; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity key={tab} onPress={()=>this.props.goToPage(i)} style={styles.tab}>
				<View  style={styles.tabItem}>
					<Text style={{color: color,fontSize:14,fontWeight:'bold'}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
	render() {
		const containerWidth = this.props.containerWidth;
		const numberOfTabs = this.props.tabs.length;
		const tabUnderlineStyle = {
			position: 'absolute',
			width: containerWidth / numberOfTabs,
			height: 4,
			backgroundColor: 'navy',
			bottom: 0
		};

		const left = this.props.scrollValue.interpolate({
			inputRange: [0, 1 ], outputRange: [0,  containerWidth / numberOfTabs ]
		});
		return (
			<View style={[styles.tabs,{height:this.props.tabHeight}]}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
				<Animated.View style={[tabUnderlineStyle, { left }, this.props.underlineStyle]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderBottomColor:'gray',
		backgroundColor:'white'
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center'
	},
});


export default SelfTabBar;