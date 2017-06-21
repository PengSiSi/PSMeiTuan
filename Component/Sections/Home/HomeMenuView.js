//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import PageControl from './../../Common/PageControl';

class HomeMenuItem extends PureComponent {
    render() {
        return(
            <TouchableOpacity style={styles.menuItemContainer}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.iconStyle} />
                <Text>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default class HomeMenuView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
    }

    render() {
         let { menuInfos, onMenuSelected } = this.props
         let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={() => {
                        onMenuSelected && onMenuSelected(i)
                    }} />
            )
        )
        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / 10)

        for (let i = 0; i < pageCount; i++) {
            let length = menuItems.length < (i * 10) ? menuItems.length - (i * 10) : 10
            let items = menuItems.slice(i * 10, i * 10 + length)

            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => this.onScroll(e)}
                >
                    <View style={styles.menuContainer}>
                        {menuViews}
                    </View>
                </ScrollView>
                <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor={Color.kMainColor}
                    indicatorSize={{ width: 8, height: 8 }}
                />
            </View>
        );
    }

    onScroll(e) {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / Space.kScreenWidth)
        console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
        if (this.state.currentPage != currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    menuItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Space.kScreenWidth / 5,
        height: Space.kScreenWidth / 5,
    },
    iconStyle: {
        width: Space.kScreenWidth / 9,
        height: Space.kScreenWidth / 9,
        margin: 5,
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Space.kScreenWidth,
    },
    pageControl: {
        margin: 10,
    }
});
