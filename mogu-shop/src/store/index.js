import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建store对象
const store = new Vuex.Store({
    state: {
        cartList: [],
        // name: 'hurst'
    },
    mutations: {
        addCart(state, payload){
            // 1. 查找购物车中是否已存在该商品
            let product = state.cartList.find( item => item.id == payload.id)
            // console.log(payload)
            // 2. 根据查找结果执行不同的操作
            if (product){
                // let oldProduct = state.cartList[index]
                console.log(product.id + '存在')
                product.count += 1
            } else {
                console.log('不存在，添加')
                payload.count = 1
                payload.isSelected = true //储存购物车中的商品是否被选中的状态
                state.cartList.push(payload)
            }
            
        },
        // changeName(state){
        //     state.name = 'xingxing'
        // }
    }
})

// 3. 挂载到vue实例上 
export default store 