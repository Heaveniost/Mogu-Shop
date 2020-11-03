<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">蘑菇街</div>
        </nav-bar>
        <!-- 轮播图 -->
        <home-swiper :banners="banners"></home-swiper>
        <!-- 推荐商品 -->
        <recom-view :recommends='recommends'></recom-view>
        <!-- 流行商品 -->
        <feature-view></feature-view>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>

    </div>
</template>

<script>
    //导入页面组件
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecomView from './childComps/RecomView';
    import FeatureView from './childComps/FeatureView';

    //导入公共文件
    import NavBar from "components/common/navbar/NavBar";

    //导入函数 
    import { getHomeMultidata } from "network/home";
   

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecomView,
            FeatureView
        },
        data() {
            return {
                banners: [],
                recommends: [],
            };
        },
        created() {
            this.getHomeMultidata();
        },
        methods: {
            getHomeMultidata() {
                getHomeMultidata().then((res) => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                });
            },
        },
    };
</script>

<style scoped>
    #home {
        padding-top: 44px;
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
</style>