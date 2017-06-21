//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, WebView, InteractionManager } from 'react-native'

// create a component
export default class WebScene extends PureComponent {

    // 导航栏
    static navigationOptions = ({ navigation }) => ({
        headerStyle: { backgroundColor: 'white' },
        title: navigation.state.params.title,  // 获取传递过来的数据
    });

    constructor(props) {
        super(props);
        this.state = {
            source: {}  // 传递进来的请求url
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({ title: '加载中' })
            this.setState({ source: { uri: this.props.navigation.state.params.url } })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref='webView'
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={this.state.source}
                    onLoadEnd={(e) => this.onLoadEnd(e)}
                    scalesPageToFit
                />
            </View>
        );
    }

    // 加载数据结束
    onLoadEnd(e) {
        if (e.nativeEvent.title.length > 0) {
            this.props.navigation.setParams({ title: e.nativeEvent.title })
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    webView: {
        flex: 1,
        backgroundColor: 'white',
    }
});