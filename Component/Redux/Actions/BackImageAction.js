import * as types from './../ActionTypes';

import {
    AsyncStorage,
} from 'react-native';
let KEY = 'PSMeiTuan';

export function backImage() {
    return dispatch => {
        return AsyncStorage.getItem(KEY,(Error,result)=>{
                if (result === null){
                    dispatch(getBackImage('img'))
                } else {
                    console.log('获取图片成功' + result);
                    dispatch(getBackImage(result));
                }
            });
        }
};


export function getBackImage(imageURL) {
    return {
        type: types.BACKIMAGE_URL,
        imageURL  // 键值相等可以直接这么写
    }
}