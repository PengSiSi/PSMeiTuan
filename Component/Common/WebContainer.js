/**
 * 出处：http://bbs.reactnative.cn/topic/2890/%E5%A6%82%E4%BD%95%E8%AE%A9webview%E8%87%AA%E9%80%82%E5%BA%94%E9%AB%98%E5%BA%A6/3

 *使用:
import WebContainer from '../../components/WebContainer';
const HTML = '<img src="http://meidui.oss-cn-shenzhen.aliyuncs.com/579576890cf2b47be55bc693/attachment/20168/1473156327681-57ce94e70cf2906815916beb.jpg" style="color: rgb(0, 0, 0); font-family: &quot;Microsoft Yahei&quot;, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714px; width: 800px; max-width: 100%; min-width: auto; min-height: auto; height: auto; outline: none !important;">';
<WebContainer html={String(this.state.goodData.pc_desc).replace(/\\/g,'')} />

 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    WebView,
    Platform
} from 'react-native';

const script = `<script>
      function _autoHeight(){
        window.location.hash = Date.now();
        document.title = document.documentElement.offsetHeight;
        document.body.style.height = document.documentElement.offsetHeight;
      }
      setInterval(_autoHeight,1000);
//    window.addEventListener('load', _autoHeight)
    </script>`;

let safeHtml = function (html) {
    if (!html) {
        return ''
    }
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
      <style media="screen">
        html,body{overflow: hidden;min-height:64px;}
        img{max-width: 100%}
      </style>
    </head>
    <body>
      ${html}
      ${script}
    </body>
  </html>
  `
}

export default class WebContainer extends Component {
    constructor(props) {
        super();
        this.state = {
            height: Number(props.height) || 0
        };
    }

    onNavigationStateChange(navState) {
        let h = Number(navState.title)||0
        if (h) {
            this.setState({
                height: h
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.props.html==nextProps.html&&this.state.height==nextState.height) {
            return false
        }
        return true
    }
    render() {
        let {
            html,
            style,
            scrollEnabled,
            ...props
        } = this.props;

        let page = safeHtml(html||'');
        if (!page) {
            return (<View/>)
        }
        return (
        <WebView
                {...props}
                style={[style, {height: Number(this.state.height)}]}
                source={{html: page, baseUrl: '', title: ''}}
                ref={(c) => {this.webview = c}}
                scrollEnabled={ Platform.OS ==='ios'}
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={false}
                scalesPageToFit={true}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
        );

    }
}