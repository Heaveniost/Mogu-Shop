<template>
    <div id="detail">
        <detail-navbar class="detail-nav"></detail-navbar>
        <!-- <div>{{ $store.state.cartList}}</div> -->
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
            <detail-goods-info :images="images" :desc="desc" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
            <goods-list :goods="recommendList"></goods-list>
            <!-- <detail-recommend-info :recommen-list="recommendList"></detail-recommend-info> -->
        </scroll>
        <!-- <detail-bottom-bar @blur="addToCar"></detail-bottom-bar> -->
        <detail-bottom-bar @addCart="addToCar"></detail-bottom-bar>
    </div>
</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from '@/components/content/goods/GoodsList'
    // import DetailRecommendInfo from './childComps/DetailRecommendInfo';
    import DetailBottomBar from './childComps/DetailBottomBar'
    import Scroll from "@/components/common/scroll/Scroll";

    import {
        getRecommend
    } from "@/network/detail";
    import {
        getDetail,
        Goods,
        Shop,
        GoodsParam
    } from "@/network/detail";
    import {
        mixin
    } from "@/common/mixin"

    export default {
        name: "Detail",
        data() {
            return {
                id: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                images: [],
                desc: "",
                commentInfo: {},
                recommendList: []
            };
        },
        components: {
            DetailNavbar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            // DetailRecommendInfo,
            GoodsList,
            DetailBottomBar,
            Scroll,
        },
        mixins: [mixin],
        created() {
            this.getDetailData();
            this._getRecommend();
        },
        destroyed() {
            this.$bus.$off('itemImageLoad', this.itemListener)
            // console.log('详情页事件销毁')
        },
        methods: {
            imageLoad: function () {
                this.$refs.scroll.refresh();
            },
            getDetailData() {
                // 1.获取id
                const id = this.$route.params.id; //$route.query.id找不到id
                this.id = id;
                // console.log(this.$route.query.id)
                // 2.请求数据
                getDetail(id).then((res) => {
                    // 2.1 获取结果
                    const data = res.result;
                    // console.log(res);

                    // 2.2 获取顶部信息
                    this.topImages = data.itemInfo.topImages;

                    // 2.3 获取商品信息
                    this.goods = new Goods(
                        data.itemInfo,
                        data.columns,
                        data.shopInfo.services
                    );

                    // 2.4 获取店铺信息
                    this.shop = new Shop(data.shopInfo);

                    // 2.5 获取商品的详情数据
                    this.datailInfo = data.detailInfo;
                    this.images = data.detailInfo.detailImage[0].list;
                    this.desc = data.detailInfo.desc;

                    // 2.6 获取参数的信息
                    this.paramInfo = new GoodsParam(
                        data.itemParams.info,
                        data.itemParams.rule
                    );

                    // 2.7 保存评论信息
                    if (data.rate.list) {
                        this.commentInfo = data.rate.list[0];
                    }
                });
            },
            _getRecommend() {
                getRecommend().then((res, error) => {
                    if (error) return;
                    this.recommendList = res.data.list;
                });
            },
            addToCar() {
                // 1. 获取购物车需要展示的信息 
                const obj = {}
                obj.id = this.id;
                obj.img = this.topImages[0]
                obj.title = this.goods.title
                obj.desc = this.goods.desc;
                obj.price = this.goods.realPrice;
                // console.log('加到购物车')

                // 2. 将商品添加到购物车里
                // console.log(this.$store.state.cartList)
                // this.$store.commit('addCart', obj)
                this.$store.dispatch('addCart', obj).then(res => {
                    this.$toast.show(res, 1500)
                })
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px);
    }

    p {
        width: 80%;
    }
</style>