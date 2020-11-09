<template>
    <div>
        <nav-bar class="navbar">
            <div slot="center">购物车({{ cartLength }})</div>
        </nav-bar>
        <!-- 商品汇总 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
    </div>
</template>

<script>
    import NavBar from '@/components/common/navbar/NavBar'
    import CartList from './childComps/CartList'

    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList
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
    .navbar {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>