import {observable, useStrict, action, computed} from 'mobx';
import {data} from './../Resource/CartData';

// findById (list, id){
//   return list.filter(item => item.id === id)[0];
// }

useStrict(true);//这里用到了严格模式，在修改类的成员属性的时候函数前面需要加上 @action

// 将数据源添加check是否选中的标记
const dataList = data.map((item)=>{
    return {
        checked: true,
        ...item
    }
});

export default class CartState {
    // 数据源
    @observable list = dataList;

    // 是否全选
    @observable checkedAll = true;

    // 删除
    @action removeItem(id) {
        this.list.forEach((item,i)=> {
            if (item.id == id) {
                this.list.splice(i, 1);
            }
        });
    }

    // 加
    @action add(id) {
        console.log('add = '+ id);
        this.list.forEach(item => item.id === id && item.buyNum++);
    }

    // 减
    @action sub(id) {
        console.log('sub = '+ id);
        this.list.forEach(item => (item.id === id && item.buyNum > 0) && item.buyNum--);
    };

    // 勾选
    @action onChecked = (id) => {
        this.list.forEach(item => {
      if (item.id === id) {
        item.checked ? this.checkedAll = false : null;
        item.checked = !item.checked;
      }
    });
    !this.list.some((item) => item.checked === false) ? this.checkedAll = true : null;
  }

  // 勾选全选
    @action onCheckedAll = () => {
        this.checkedAll = !this.checkedAll;
        this.checkedAll ? this.list.forEach(item => item.checked = true) : this.list.forEach(item => item.checked = false);
  };

    // 计算总价
    @computed get totalPrice() {
        let total = 0;
        this.list.forEach((item, i) => {
        if (item.checked) {
            total += this.list[i].buyNum * this.list[i].price;
        }
        });
        return total;
    }
}