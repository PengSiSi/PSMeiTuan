'use strict'
import React, {Component} from 'react';

var CryptoJS = require("crypto-js");

export class EncryptUtils extends React.Component {

    static encryptAES(message, key){
        var messageUtf8 = CryptoJS.enc.Utf8.parse(message);
        var keyUtf8 = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.AES.encrypt(messageUtf8, keyUtf8, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var str = encrypted.toString();
        str = str.replace(/\//g, '-');
        str = str.replace(/\+/g,'*');
        return str;
    }

    static encryptSHA1(string){
        return CryptoJS.SHA1(string);
    }

}

module.exports = EncryptUtils;