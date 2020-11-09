<template>
    <div class="check-button" :class="{ selected: isSelected }">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "checkButton",
        props: {
            isSelected: {
                type: Boolean,
                default () {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
    .check-button {
        border: 2px solid #aaa;
        border-radius: 50%;
    }

    .selected {
        border-color: red;
        background-color: red;
    }
</style>>