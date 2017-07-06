import { observable } from 'mobx';

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