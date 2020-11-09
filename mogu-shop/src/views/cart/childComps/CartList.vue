<template>
    <div class="cartlist">
        <scroll class="content" ref="scroll">
            <cartlist-item v-for="(item, index) in CartList" :key="index" :product="item"></cartlist-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '@/components/common/scroll/Scroll'
    import CartlistItem from './CartlistItem'

    export default {
        name: 'CartList',
        components: {
            Scroll,
            CartlistItem
        },
        computed: {
            CartList() {
                return this.$store.state.cartList
            }
        },
        activated(){
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .carlist {
        height: calc(100% -44px -49px);
    }
    .content {
        height: 100%;
        overflow: hidden;
    }
</style>