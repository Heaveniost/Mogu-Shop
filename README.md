### 项目介绍

​		此项目全程在在vs code中基于前端框架Vue开发，已成功部署在阿里云服务器，建议在手机移动端进行访问，在PC端访问请打开手机调试模式。[点击访问](http://8.129.119.166)

​		如有疑惑，请通过电子邮件联系作者: [304090717@qq.com](304090717@qq.com)

### 项目开发的流程：

#### 开发首页

1. 划分目录结构

2. 引入两个css文件   对样式进行一个统一的处理 / 标签

   ```
   复制normalize.css 在base.css里面引入，然后再App.Vue里引入 
   Add "scoped" attribute to limit CSS to this component only
   vue.config.js配置变量会和公共配置进行合并 
   ```

3. vue.config.js配置

   ```
   全局配置别名 / 这个好像是webpack相关的知识点 
   vue.config.js 里配置的变量会和公共配置进行合并 
   .editorconfig.js 如果旧项目中有这个包就拷贝过来，没有不用管，也是一些自定
   义的样式之类的 
   ```

4. 页面跳转/主页面模块的划分 tabbar路由的对应关系 

   ```
   tabbar的点击跳转 路由跳转 routes模块 router-view 
   import VueRouter from 'vue-router' VueRouter --> Router 出现bug时也要也要学会看console的提示
   在router/index.js 定义几个页面跳转的路由即可，main.js已经将路由注册上去了，在主页面使用<router-view>调用
       
   ```

5. 完成首页导航栏的配置  小程序不用自己配置/改标题就行 

6. 网络模块的封装/准备请求数据  

   ```
   络模块的封装/准备请求数据  
   安装网络模块  cnpm i axios --save
   用export default导出的内容，可以直接接收，否则需要加上大括号  import {} from '..'
   对请求回来的数据进行分析，用合适的变量进行存储
   应该是先导入轮播图，再请求数据进行填充 
   webapp的请求函数没有uni-app好，后者调用了es6的语法更简洁，先完成功能最后进行改进 
   ```

7. 完成轮播图的展示 

   ```
   轮播图有两个组件，丢到js文件里一起导出。
   复杂的页面可能也会有很多组件，如果全部丢在主页面，各种函数 数据会很臃肿，因此将页面组件丢到子文件夹里 
   ```

8. 推荐页的展示 ！

   ```
   这也封装成了一个组件，但是这个组件很简单，应该也可以直接写，uni-app这个部分是直接写的  
   import . from '@/components' 或者直接使用components都可以
   img src="~assets"  必须加波浪线 
   ```

9. tab-control 流行新款精选 

   ```
   怎么点击切换按钮？  给选中的按钮不一样的样式  
   web app  :class="{active: index === currentIndex}" 
   uni-app  :class="active===index?'active':''"
   ```

10. 完成商品详情页的布置 而且能根据流行 新款等展现不同的内容 

    ```
    是通过传入的参数不同来实现的，参数不同，请求的数据不同，渲染出来的页面就不同 
    还有，已经到底了，没有数据了，应该就不再发送网络请求了，显示 到底了 等功能  
    切换按钮时，回到原按钮，页面停留在之前的位置，就是要记录它的状态 
    
    怎么实现上拉加载功能？
    在原有数组中加入一个数组中的内容 扩展运算符 
    ·tab-control点击页面显示不同，不是调用了新的组件，而是显示了不同的数据 
    ```

11. 用better-scroll来实现在移动端顺滑移动 

    ```
    better-scroll的使用，下载安装，在页面中导入，绑定实例啥的，这个估计要去看源码了（视频部分跳过了）
    现在学习直接将这一部分进行封装  
    ref的使用，父组件找到子组件  ref='swiper'   mounted: { this.$refs.swiper 可以找到指定的子组件 }
    必须要设置滚动区域的大小 
    快速生成n个列表项 ul>li{$}*4；
    scroll部分调整到height:400px时，页面无法滚动，修改了样式还是不行，重新安装了better-scroll的版本1.13.2（和视频的一致） 问题得到解决
    ```

12. 增加回到顶部按钮 

    ```
    组件原生的事件是没有，需要加上.native修饰符  @click.native="func"
    给组件一个ref属性，通过this.$refs.scroll可以直接访问scroll组件里面的数据 
    probetype 的值不同 决定了是否实时监听  
    ```

13. 上拉加载更多 

    ```
    加载完后要调用 finishPullUp 事件，否则没办法在到底后继续加载
    
        一个BUG，scroll是会计算可上拉的距离的，图片是异步加载，所以计算出来的高度比实际的高度要低
        加载完图片后，页面无法继续上移 
        解决办法：在图片加载完后调用fefresh方法重新计算高度
        Pro: 怎么知道图片加载完成了  每张图片加载完成后，都调用一次refresh方法 
    
      图片加载完毕 @load，但是这个在gooslidtItem里发生，刷新在scroll组件里，怎么联系起来
        1.子组件将事件冒泡，统一在home页面处理，太过麻烦
        2.vuex监听加载完毕的状态，home页面来处理
        3.事件总线，管理事件。 this.$bus.$emit()  this.$bus.$on() 
            先要注册事件总线 发送一个vue实例 
    
        加载图片能滑动了，但是加载到分解点的图时会卡顿一下 
    
        对于频繁调用refresh这个问题，可以使用防抖、节流函数 debounce/throttle 这两个练习一下 
    
        mounted图片都不一定加载完毕了
    ```

14. 让home保持原来的状态 

    ```
    不能每次离开home页重新进入的时候都重新加载页面，影响使用体验
    	· keep-alive 首页不销毁
        · 记录原来的位置  acitved deactived 记录状态  滚动到指定位置 saveY 
    ```

15. 跳转到详情页

    ```
    this.$router.push('/detail/' + this.goodsItem.iid) 通过路由进行调换
    
    PRO：点进详情页后，退出，换一个点击，进去的还是之前的详情页 
    解决：是由于keep-alive的影响，created不会再执行，加入exclude="Detail"即可
    
          组成  
          导航栏 : 商品 参数 评论 推荐，点击后怎么让页面显示不同的部分
          轮播图 
          基本信息的展示 
          店铺信息的展示  IM：将时间戳转换成年月日  P199 评论信息的展示 这部分先跳过  用到了正则表达式和过滤器  
    
          有两个bug需要处理下
            1. 滚动条有时候无法滚动，或需要等待一会儿才能滚动/图片加载完后重新计算better-scroll的高度，进行刷新 
            2. goods-list组件时通用的，在详情页点击不应该再跳转
    
        export default mixin = fun(){}
        export const mixin = fun(){} 有什么区别
    
        keep-alive 才有缓存，离开调用deactivated，其他的调用destoryed函数 
    
        vue中页面离开后事件监听函数还存在吗 在离开的时候需要销毁监听: (在destroyed里面销毁), 否则监听会一直存在, 
        因为这是单页面应用, 页面并未关闭.？ 页面未关闭是啥意思，还在后台运行？
    
        需要销毁监听事件 
    ```

16. 详情页的搭建

    ```
    组成  
        导航栏 : 商品 参数 评论 推荐，点击后怎么让页面显示不同的部分？
        轮播图 
        基本信息的展示 
        店铺信息的展示  IM：将时间戳转换成年月日  用到了正则表达式和过滤器  
    
    有两个bug需要处理下
         1. 滚动条有时候无法滚动，或需要等待一会儿才能滚动/图片加载完后重新计算better-scroll的高度，进行刷新 
         2. goods-list组件时通用的，在详情页点击不应该再跳转
    
        注意：keep-alive 才有缓存，离开调用deactivated，其他的调用destoryed函数 
    
        vue中页面离开后事件监听函数还存在吗 在离开的时候需要销毁监听: (在destroyed里面销毁), 否则监听会一直存在, 
        因为这是单页面应用, 页面并未关闭.？ 页面未关闭是啥意思，还在后台运行？
    ```

    

#### 开发购物车页

1. navbar显示购物车中的物品数量
2. 利用vuex存储加入到购物车中的商品信息，依次进行展示
3. 底部bottom-bar的实现
   - 全选功能的实现
   - 选中商品的总价
   - 结算功能 --> 未完成

#### 开发分类页

1. 双栏布局
2. 根据侧边栏的选中类目展示不同的内容 

#### 开发个人信息页

1. 登录 注册功能  --> 待完成
2. 个人相关信息展示  --> 待改进

### 部署到服务器 

#### 部署到本地 

```
1.打包项目  npm  run bundle,生成dist文件包 
2.下载nginx 稳定版的Windows版本 启动 
3.将打包的文件dist丢到nginx的html文件夹下 
4.通过localhost访问
·windows启动nginx，进入安装文件夹双击exe文件，修改nginx.conf文件来修改项目启动的位置
```

#### 部署到远程服务器   

```
1.购买阿里云服务器 使用centOS系统 初次购买或更换系统启动实例需要一段时间
2.安装nginx 修改配置文件，放在靠前的目录便于对打包文件进行修改
3.利用winSCP将打包文件丢进指定位置
4.启动nginx
5.对控制台实例进行安全配置，打开80端口
6.输入IP地址进行访问 

几个常见命令：
  安装
    yum install nginx 通过阿里云控制台提供的网页版cmd可以直接连接
  启动
    systemctl start nginx.service 启动nginx服务
    systemctl enable nginx.service  跟随系统启动 
  重启
     查看进程号：ps -ef|grep nginx
     杀死进程： kill -QUIT 2072
     启动服务： systemctl start nginx.service 
```







