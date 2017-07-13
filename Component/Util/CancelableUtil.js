/**
* Cancelable
* GitHub:https://github.com/crazycodeboy
* Eamil:crazycodeboy@gmail.com 
* @flow
使用:
1>导入import makeCancelable from '../util/Cancelable'
2>
this.cancelable = makeCancelable(fetch('url')));
        this.cancelable.promise
            .then((response)=>response.json())
            .then((responseData)=> {          
                console.log(responseData);                            
            }).catch((error)=> {
                console.log(error); 
            });
3>
取消网络请求：
this.cancelable.cancel();
4>
componentWillUnmount() {      
  this.cancelable.cancel();
}
5>
**/
'use strict'

export default function makeCancelable(promise){
   let hasCanceled_ = false;
   const wrappedPromise = new Promise((resolve, reject) => {
       promise.then((val) =>
           hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
       );
       promise.catch((error) =>
           hasCanceled_ ? reject({isCanceled: true}) : reject(error)
       );
   });

   return {
       promise: wrappedPromise,
       cancel() {
           hasCanceled_ = true;
       },
   };
}