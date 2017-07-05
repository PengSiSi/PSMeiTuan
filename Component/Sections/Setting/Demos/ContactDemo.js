/**
 * Created by 思思 on 17/7/4.
 * 参考博客:
 * http://www.jianshu.com/p/8672bff8db01?utm_campaign=hugo&utm_medium=reader_share&utm_content=note&utm_source=qq
 * http://www.jianshu.com/p/6302c4d48b97
 * http://blog.csdn.net/mengks1987/article/details/70236823
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    ScrollView
} from 'react-native';

import Color from './../../../Config/Color';
import CommonCell from './../../../Common/CommonCell';
import DetailCell from './../../../Common/DetailCell';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '联系人', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    render() {
        const { avatarImgName, tipTitle, subTitle, tagsArray, rightImageName} = this.props;
        var sections0 = [];
        var sections1 = [];
        for (var i = 0; i < 3; i++) {
            var datas = [];
            for (var j = 0; j < 1; j++) {
                datas.push({title: 'title:' + j});
            }
            sections0.push({key: i, data: datas});
        }

        for (var i = 0; i < 1; i++) {
            var datas = [];
            for (var j = 0; j < 5; j++) {
                datas.push({title: 'title:' + j});
            }
            sections1.push({key: i, data: datas});
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/*注意: 这里需要使用scrollView包一下,否则两个sectionList会分层,滑动不能一起滑动!*/}
                <ScrollView>
                    <SectionList
                        // contentInset={{top:0,left:0,bottom:49,right:0}}// 设置他的滑动范围
                        renderItem={this.renderCommonCell.bind(this)}
                        showsVerticalScrollIndicator={true}  // 是否显示垂直滚动条
                        keyExtractor = {this.extraUniqueKey.bind(this)}// 每个item的key
                        // contentContainerStyle={styles.list}
                        horizontal={false}
                        // pageSize={4}  // 配置pageSize确认网格数量
                        sections={ // 不同section渲染相同类型的子组件
                            sections0
                        }
                    />
                    <SectionList
                        // contentInset={{top:0,left:0,bottom:49,right:0}}// 设置他的滑动范围
                        renderItem={this.renderDetailCell.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}
                        showsVerticalScrollIndicator={false}
                        keyExtractor = {this.extraUniqueKey.bind(this)}// 每个item的key
                        // contentContainerStyle={styles.list}
                        horizontal={false}
                        pageSize={4}  // 配置pageSize确认网格数量
                        sections={ // 不同section渲染相同类型的子组件
                            sections1
                        }
                    />
                    </ScrollView>
                </View>
            </View>
        );
    }

    //Component挂载完毕后调用
    componentDidMount() {
        this.fetchData();
    }

    // 加载数据
    fetchData() {

    }

    // 渲染sectionHeader
    renderSectionHeader(info) {
        // if (info.section.key === 1) {
            return(
            <View style={{justifyContent: 'center', height: 30, backgroundColor: '#F7F6F8'}}>
            <Text style={{height: 30, padding: 10}}>
                我的患者
            </Text>
            </View>
        );
        // }
    }

    // 唯一的key,必须要的
    extraUniqueKey(item, index) {
         return "index"+index+item;
    }

    // 加载section0的cell
    renderCommonCell(info) {
            return(
                <View>
                <CommonCell 
                    imageName={require('./../../../Images/Home/icon_homepage_default.png')}
                    title='患者统计' 
                    subTitle='(1)' 
                    rightImageName={require('./../../../Images/Home/public_ic_more@2x.png')} >
                </CommonCell>
            </View>
        );
    }

    // 加载section1的cell
    renderDetailCell(info) {
        return(
            <View>
             <DetailCell 
                avatarImgName={require('./../../../Images/Home/icon_homepage_beautyCategory.png')}
                tipTitle='小白- 32岁' 
                subTitle='当前诊断: 感冒病' 
                rightImageName={require('./../../../Images/Mine/icon_mine_customerService@2x.png')}
                tagsArray={['aaa','bbb','ccc','aaa','bbb','ccc','aaa','bbb','ccc']}>
            </DetailCell>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});