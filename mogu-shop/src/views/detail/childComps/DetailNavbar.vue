<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item" :class="{active: index === currentIndex}"
           v-for="(item,index) in titles" @click="titleClick(index)"
           :key="item.id">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavbar",
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0,
      };
    },
    components: {
      NavBar,
    },
    methods: {
      titleClick: function(index) {
        this.currentIndex = index

      },
      backClick: function(){
        this.$router.back()
      }
    }
  };

</script>

<style scoped>
  .title {
    display: flex;
    font-size: 12px;
    /* justify-content: space-around; */
  }

  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 12px;
    /* width: 80%;  最好还能调小点 */
  }

</style>
