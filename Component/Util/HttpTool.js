import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

import fetch from './../Third/fetch-polyfill'

/**
 * 网络请求类
 * 
 * @export
 * @class HttpTool
 * @extends {React.Component}
 */
export default class HttpTool extends React.Component {

    /**
     * get请求
     * 
     * @static
     * @param {any} url 
     * @param {any} headers 
     * @param {any} params 
     * @param {any} dataCallBack 
     * @param {any} errorCallBack 
     * 
     * @memberof HttpTool
     */
    static getRequest(url, headers, params, dataCallBack, errorCallBack) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params),
            timeout: 20*1000
        })
            .then((response) => response.json())
            .then((responseData) => {
                dataCallBack(responseData)
            })
            .catch((error) => {
                errorCallBack(error)
            }).done();
    }

    /**
     * post请求
     * 
     * @static
     * @param {any} url 
     * @param {any} headers 
     * @param {any} params 
     * @param {any} dataCallBack 
     * @param {any} errorCallBack 
     * 
     * @memberof HttpTool
     */
    static postRequest(url, headers, params, dataCallBack, errorCallBack) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params),
            timeout: 20*1000
        })
            .then((response) => response.text())
            .then((responseData) => {
                dataCallBack(JSON.parse(responseData))
                // dataCallBack(responseData);
            })
            .catch((error) => {
                errorCallBack(error);
            }).done();
    }
};

AppRegistry.registerComponent('HttpTool', () => HttpTool);