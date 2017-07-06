import { observable,computed,autorun,action,useStrict } from 'mobx';

// useStrict(true);//这里用到了严格模式，在修改类的成员属性的时候函数前面需要加上 @action
 
class AppState {
    
    @observable timer = 0;

    // 注意这里不能调用super(props),否则报错
    constructor(props) {
        // 一秒递增
        setInterval(()=>{
            this.timer += 1;
        }, 1000);
    }

    // 重置计数器
    resetTimer() {
        this.timer = 0;
    }
}

export default AppState;