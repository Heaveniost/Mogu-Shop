import {
    ADD_COUNTER,
    ADD_TO_CART
  } from './mutation-types'
  
export default {
    // mutaions唯一的目的就是修改state的状态
    // 每个方法尽可能只完成一个任务
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.isSelected = false
        state.cartList.push(payload)
    }
}