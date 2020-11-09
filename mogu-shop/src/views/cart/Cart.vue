<template>
    <div>
        <h1>cart</h1>
        <p @click="changeName">changeName</p>
        <p>shuju: {{ this.$store.state.cartList }}</p>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    // mounted(){
    //     console.log(this.$store.state.carList)
    // },
    // activated(){
    //     console.log(this.$store.state.carList)
    // },
    methods: {
        changeName(){
            // this.$store.commit('changeName');
            console.log(this.$store.state.name)
            console.log(this.$store.state.cartList)
        }
    }
}
</script>

<style scoped>

</style>