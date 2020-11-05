<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">蘑菇街</div>
        </nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <!-- 轮播图 -->
            <home-swiper :banners="banners"></home-swiper>
            <!-- 推荐商品 -->
            <recom-view :recommends="recommends"></recom-view>
            <!-- 流行商品 -->
            <feature-view></feature-view>
            <!-- 副导航栏 -->
            <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
            <!-- 商品展示 -->
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

    </div>
</template>

<script>
    //导入页面组件
    import HomeSwiper from "./childComps/HomeSwiper"
    import RecomView from './childComps/RecomView'
    import FeatureView from './childComps/FeatureView'
    import BackTop from '@/components/content/backTop/BackTop'

    //导入公共文件
    import NavBar from "@/components/common/navbar/NavBar";
    import tabControl from '@/components/content/tabControl/tabControl'
    import GoodsList from '@/components/content/goods/GoodsList'
    import Scroll from '@/components/common/scroll/Scroll'

    //导入函数 
    import {
        getHomeMultidata,
        getHomeGoods
    } from "network/home";


    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecomView,
            FeatureView,
            tabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {
                        page: 0,
                        list: []
                    },
                    'new': {
                        page: 0,
                        list: []
                    },
                    'sell': {
                        page: 0,
                        list: []
                    }
                },
                currentType: 'pop',
                isShowBackTop: false
            };
        },
        created() {
            //请求轮播图数据
            this.getHomeMultidata();

            //请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            //事件监听相关方法
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
            },
            //网络请求相关方法
            getHomeMultidata() {
                getHomeMultidata().then((res) => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                });
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
            },
            //回到顶部
            backTop() {
                const a = this.$refs.scroll.scrollTo(0, 0)
            },
            //回到顶部按钮的显示与隐藏
            contentScroll(position){
                this.isShowBackTop = (-position.y) > 1000
            }
        },
    };
</script>

<style scoped>
    #home {
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 1;
    }

    .content {
        /* height: 400px; */
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>