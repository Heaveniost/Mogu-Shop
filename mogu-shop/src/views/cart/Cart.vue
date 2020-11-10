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

    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            cartLength() {
                return this.$store.state.cartList.length
            }
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