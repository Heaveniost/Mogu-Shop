<template>
    <div class="cart">
        <nav-bar class="navbar">
            <div slot="center">购物车({{ cartLength }})</div>
        </nav-bar>
        <!-- 商品汇总 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import NavBar from '@/components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import CartBottomBar from './childComps/CartBottomBar'

    import { mapGetters } from 'vuex'

    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        created() {
            this.$toast.show('加入购物车功能已完成，可去商品详情页添加新的数据', 3500)
        },
        computed: {
            ...mapGetters(['cartLength', 'cartList'])
        },
        methods: {

        }
    }
</script>

<style scoped>
    .cart {
        height: 100vh;
    }
    .navbar {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>