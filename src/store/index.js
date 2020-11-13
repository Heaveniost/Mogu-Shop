import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建store对象
const state = {
    cartList: [
        {
            count: 1,
            desc: "建议零售价	¥129.00	↵面料名称	奥戴尔	主面料成分	棉	主面料成分的含量	95（%）↵图案	纯色	风格	文艺↵款式	套头	袖长	短袖	工艺	拼贴/拼接     88803",
            id: "1jw0sr2",
            img: "//s11.mogucdn.com/p2/170301/106341701_4kfgdd3001475k8h1l365al2k5ed6_640x960.jpg",
            isSelected: false,
            price: "56.64",
            title: "2018 新款女装上衣文艺棉麻短袖t恤 V领衫T恤女短袖女T桖"
        },
        {
            count: 1,
            desc: "新款",
            id: "1m7s9c4",
            img: "//s3.mogucdn.com/mlcdn/c45406/180828_550k23i82cbibh32602fl43jc9aid_800x1200.jpg",
            isSelected: false,
            price: "88.90",
            title: "秋装女2018新款早秋女装裙子韩版针织连衣裙+衬衫上衣时尚套装"
        }
    ]
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

// 3. 挂载到vue实例上 
export default store 