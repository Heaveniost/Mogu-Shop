<template>
    <div>
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">蘑菇街</div>
        </nav-bar>
        <!-- 轮播图 -->
        <home-swiper :banners="banners"></home-swiper>

    </div>
</template>

<script>
    //导入页面组件
    import HomeSwiper from "./childComps/HomeSwiper";

    //导入公共文件
    import NavBar from "@/components/common/navbar/NavBar";

    //导入函数 
    import { getHomeMultidata } from "network/home";
   

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper
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
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>