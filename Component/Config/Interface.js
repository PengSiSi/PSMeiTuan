import React, {
  Component
} from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from 'react-native';

import HttpTool from './../Util/HttpTool'
import Constant from './Constant'

/**
 * 接口类
 * 
 * @export
 * @class Interface
 * @extends {Component}
 */
export default class Interface extends Component {

  /**
   * 登录接口
   * 
   * @static
   * @param {any} userName 
   * @param {any} password 
   * @param {any} dataCallBack 
   * @param {any} errorCallBack 
   * 
   * @memberof Interface
   */
  static MH_login(userName, password, dataCallBack, errorCallBack) {
    var url = (Constant.kDefault_MH_URL + '/UserInfo-portlet/UserInfo/userlogin/' + userName + '/' + password + '/checkinfo.json');
    var headers = {
      name: userName,
      pwd: password
    };
    this.postRequest(url, headers, null, dataCallBack, errorCallBack);
  }

  /**
   * 2 获取标题接口
   * 
   * @static
   * @param {any} dataCallBack 
   * @param {any} errorCallBack 
   * 
   * @memberof Interface
   */
  static MH_getTitle(dataCallBack, errorCallBack) {
    var url = (Constant.kDefault_MH_URL + '/notice-work-portlet/NoticeWork/news/getTitle.json');
    var headers = {
      name: Constant.kUserName,
      handShakePassword: Constant.kHandshakepassword
    }
    this.postRequest(url, headers, null, dataCallBack, errorCallBack);
  }

  /**
   * 6.1 获取列表接口
   * 
   * @static
   * @param {any} pageSize 
   * @param {any} pageNum 
   * @param {any} newsType 
   * @param {any} title 
   * @param {any} author 
   * @param {any} startTime 
   * @param {any} endTime 
   * @param {any} bigType 
   * @param {any} dataCallBack 
   * @param {any} errorCallBack 
   * 
   * @memberof Interface
   */
  static MH_getNewsList(pageSize, pageNum, newsType, title, author, startTime, endTime, bigType, dataCallBack, errorCallBack) {
    var url = (Constant.kDefault_MH_URL + '/notice-work-portlet/NoticeWork/news/' + pageSize + '/' + pageNum + '/' + newsType + '/' + title +
      '/' + author + '/' + startTime + '/' + endTime + '/' + bigType + '/getNewsList.json');
    var headers = {
      name: Constant.kUserName,
      handShakePassword: Constant.kHandshakepassword
    }
    this.postRequest(url, headers, null, dataCallBack, errorCallBack);
  }

  /**
   * 6.2 获取详情页
   * 
   * @static
   * @param {any} newsId 
   * 
   * @memberof Interface
   */
  static MH_getNewsDetail(newsId, dataCallBack, errorCallBack) {
    var url = (Constant.kDefault_MH_URL + '/notice-work-portlet/NoticeWork/news/' + newsId + '/getNewsDetail.json');
    var headers = {
      name: Constant.kUserName,
      handShakePassword: Constant.kHandshakepassword
    }
    this.postRequest(url, headers, null, dataCallBack, errorCallBack);
  }

  /**
   * 1.1 获取用户个人信息
   * 
   * @static
   * 
   * @memberof Interface
   */
  static MH_getUserInfo(dataCallBack, errorCallBack) {
    var url = (Constant.kDefault_MH_URL + '/UserInfo-portlet/UserInfo/getUserInfo.json');
    var headers = {
      name: Constant.kUserName,
      handShakePassword: Constant.kHandshakepassword
    }
    this.getRequest(url, headers, null, dataCallBack, errorCallBack);
  }


  /*  参数
   limit(可选):查询数据的分布范围，格式 0,1【0为起始数据，1为查询数据条数】,空值表示无限制
   orderby(可选):查询数据的排序方式，格式 field asc【field为排序字段（见field枚举），asc为排序方式（asc/desc）】,空值表示默认排序,如：sendtime desc
   where(可选):查询数据的条件,空值表示无条件
   格式为JSON数组格式，[{“field”:”字段名”,”value”:”值”,”condition”:” equal”},…]
   
   field:
   sourceappid:消息来源(应用id)
   sendtime:发送时间(值格式：2015-01-01 04:00:00)
   content:消息内容
   msgid:消息发送批次号
   receiver:接收用户的ID号
   state:是否已读 0未读 1已读
   condition:
   “=”: 等于
   “>”:大于
   “<”:小于
   “>=”:大于等于
   “<=”:小于等于
   “like”:模糊查询
   where内容示例：
   [{“field”:”sendtime”,”value”:”2015-01-01 04:00:00”,”condition”:” >=”},{“field”:”sendtime”,”value”:”2015-12-01 04:00:00”,”condition”:”<=”}，{“field”:”content”,”value”:”中国”,”condition”:” like”}]
   */
  static Push_list(first, last, userId, sourceappId, dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/list')
    var limit = first + ',' + last;
    var params;
    if (userId.length > 0) {
      var where;
      var value = '\"' + userId + '\"';
      var recive = {
        field: receiver,
        value: value,
        condition: '\"=\"',
      }
      if (sourceappId.length > 0) {
        var sourceappIdKV = {
          field: 'sourceappid',
          value: sourceappId,
          condition: '\"=\"',
        }
        where = '[' + sourceappIdKV + ',' + recive + ']';
      } else {
        where = '[' + recive + ']';
      }
      params = {
        limit: limit,
        orderby: 'sendtime desc',
        where: where,
      }
    } else {
      params = {
        limit: limit,
        orderby: 'sendtime desc',
      }
    }
    console.log('pushListParams', params)
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }

static Push_setReaded(msgidid, dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/setReaded')
    var params = {
      user: Constant.kUserName,
      msgidid: msgidid,
    }
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
}

  /**
   * 1.0.3    消息平台注册接口
   * 
   * @static
   * @param {any} dataCallBack 
   * @param {any} errorCallBack 
   * 
   * @memberof Interface
   */
  static Push_userBind(dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/userBind')
    var ostype = Platform.OS === Constant.kIOS ? Constant.kIOS : Constant.kAndroid;
    var params = {
      user: Constant.kUserName,
      clientid: Constant.kDeviceToken,
      ostype: ostype
    }
    console.log('deviceToken', Constant.kDeviceToken)
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }

  static Push_delete(sourceappid, msgid, dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/delete')
    var params = {
      user: Constant.kUserName,
      msgid: msgid,
      sourceappid: sourceappid
    }
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }

  static Push_applist(dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/applist')
    var params = {
      user: Constant.kUserName,
    }
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }

  static Push_unReadedCount(dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/unReadedCount')
    var params = {
      user: Constant.kUserName,
    }
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }

  static Push_getBindedUser(dataCallBack, errorCallBack) {
    var url = (Constant.kPushUrl + '/news/getBindedUser')
    var params = {
      user: Constant.kUserName,
    }
    this.postRequest(url, null, params, dataCallBack, errorCallBack);
  }








  //post请求
  static postRequest(url, headers, params, dataCallBack, errorCallBack) {
    console.log('Interface url' + url);
    HttpTool.postRequest(url, headers, params, function (responseData) {
      dataCallBack(responseData);
    }, function (error) {
      errorCallBack(error);
    })
  }

  //get请求
  static getRequest(url, headers, param, dataCallBack, errorCallBack) {
    HttpTool.getRequest(url, headers, params, function (responseData) {
      dataCallBack(responseData);
    }, function (error) {
      errorCallBack(error);
    })
  }
};

AppRegistry.registerComponent('Interface', () => Interface);