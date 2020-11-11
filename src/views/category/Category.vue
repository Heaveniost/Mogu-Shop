<template>
    <div class="category">
        <!-- 顶部栏 -->
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <!-- 正文部分 -->
        <div class="content">
            <tab-menu class="left" :categories="categories" @selectItem="selectItem"></tab-menu>
            <tab-content-category class="right" :subcategories="showSubcategory"></tab-content-category>
        </div>
    </div>
</template>

<script>
    import NavBar from '@/components/common/navbar/NavBar'
    import TabMenu from './childComps/TabMenu'
    import TabContentCategory from './childComps/TabContentCategory'

    import {
        getCategory,
        getSubcategory,
        getCategoryDetail
    } from '@/network/category'

    export default {
        name: "Category",
        data() {
            return {
                categories: [],
                showSubcategory: [],
                currentIndex: -1,
                key: -1
            }
        },
        components: {
            NavBar,
            TabMenu,
            TabContentCategory
        },
        created() {
            this._getCategory(),
            this._getSubcategories(0)
        },
        methods: {
            _getCategory() {
                getCategory().then(res => {
                    // 1.获取分类数据
                    this.categories = res.data.category.list
                    // console.log(this.categories)
                    this._getSubcategories(0)
                })
            },
            _getSubcategories(index) {
                this.currentIndex = index;
                this.key = this.categories[index].maitKey
                console.log(this.key)
                getSubcategory(this.key).then(res => {
                    // this.categoryData[index].subcategories = res.data
                    // this.categoryData = {
                    //     ...this.categoryData
                    // }
                    // console.log(res.data.list)    
                    this.showSubcategory = res.data.list           
                })
            },
            selectItem(index) {
                this._getSubcategories(index)
                // console.log('我也不知道是啥')
            }
        }
    }
</script>

<style scoped>
    #category {
        height: 100vh;
    }

    .nav-bar {
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
        z-index: 999;
        position: fixed;
        width: 100%;
    }

    .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 49px;

        display: flex;
    }
</style>