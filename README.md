地址栏的图标没换，后面找一下合适的 
！ 表示后期可以改进的地方 
最后都会打包到dist文件夹里

以下为开发项目的流程：

1.划分目录结构

2.引入两个css文件   对样式进行一个统一的处理 / 标签

    复制normalize.css 在base.css里面引入，然后再App.Vue里引入 
    Add "scoped" attribute to limit CSS to this component only

3.vue.config.js配置

4.页面跳转/主页面模块的划分 tabbar路由的对应关系 

    tabbar的点击跳转 路由跳转 routes模块 router-view 
    import VueRouter from 'vue-router' VueRouter --> Router 出现bug时也要也要学会看console的提示
    
    在router/index.js 定义几个页面跳转的路由即可，main.js已经将路由注册上去了，在主页面使用<router-view>调用

5.完成首页导航栏的配置  小程序不用自己配置/改标题就行 

6.网络模块的封装/准备请求数据      

    安装网络模块  cnpm i axios --save
    用export default导出的内容，可以直接接收，否则需要加上大括号  import {} from '..'对请求回来的数据进行分析，用合适的变量进行存储
    应该是先导入轮播图，再请求数据进行填充 
    webapp的请求函数没有uni-app好，后者调用了es6的语法更简洁，先完成功能最后进行改进   

7.完成轮播图的展示 
    轮播图有两个组件，丢到js文件里一起导出。
    复杂的页面可能也会有很多组件，如果全部丢在主页面，各种函数 数据会很臃肿，因此将页面组件丢到子文件夹里 

8.推荐页的展示 ！
    这也封装成了一个组件，但是这个组件很简单，应该也可以直接写，uni-app这个部分是直接写的  

    import . from '@/components' 或者直接使用components都可以
    img src="~assets"  必须加波浪线 
    一个重要的知识点 怎么挑出选中的按钮 
    
    ​	web app  :class="{active: index === currentIndex}" 
    ​	uni-app  :class="active===index?'active':''"

9.tab-control 流行新款精选 

```
完成吸顶效果 用position: sticky;来完成  移动端都支持，IE还有部分版本不支持
```

10.完成商品详情页的布置 而且能根据流行 新款等展现不同的内容 
    是通过传入的参数不同来实现的，参数不同，请求的数据不同，渲染出来的页面就不同 

    还有，已经到底了，没有数据了，应该就不再发送网络请求了，显示 到底了 等功能  
    切换按钮时，回到原按钮，页面停留在之前的位置，就是要记录它的状态 
    怎么实现上拉加载功能
    在原有数组中加入一个数组中的内容 扩展运算符 
    computed 是什么  什么时候调用 
    
    tab-control点击页面显示不同，不是调用了新的组件，而是显示了不同的数据 
    
    new news拼错了，耽误了好几个小时

11.用better-scroll来实现在移动端顺滑移动 
    better-scroll的使用，下载安装，在页面中导入，绑定实例啥的，这个估计要去看源码了（视频部分跳过了）
    现在学习直接将这一部分进行封装  

    ref的使用，父组件找到子组件  ref='swiper'   mounted: { this.$refs.swiper 可以找到指定的子组件 }
    
    必须要设置滚动区域的大小 
    
    快速生成n个列表项 ul>li{$}*4；
    
    不知道为啥，现在加载页面特别慢，本来以为是better-scroll的问题，去掉这个组件后还是很慢，网络数据请求不回来，
    但是自己在网页中输入又没啥问题。今天一天的进度就在解决这个better-scroll问题了，而且还没弄完。
    可能是开启的网页太多了，重启电脑后好了很多。
    找到上面问题的bug了，把BASE_URL地址隐藏了，所以无法请求数据，导致页面加载特别慢
    
    又遇到一个bug,主页面宽度为375.2，所以出现了横向滚动条。 需要先取消手机，切回电脑端，再切回手机端 
    
    scroll部分调整到height:400px时，页面无法滚动，修改了样式还是不行，重新安装了better-scroll的版本1.13.2（和视频的一致）
    解决问题
    
    vh-viewport heigth 视口高度 
    
    耽误了一天多的时间在better-scroll上，一是版本问题（其实弹幕早就说了，没有去尝试修改），二是非要把URL隐藏
    起来，专心做眼前的事，接口后期再隐藏就是了
    
    接口地址的问题，后期再说吧
    
    .gitignore文件修改完后，需要设置一下？ 
    git rm -r --cached .
    git add . 而且之前提交的被忽略文件也会被删除，只想隐藏，不想删除，后期再说吧

12.增加回到顶部按钮 
    组件原生的事件是没有，需要加上.native修饰符  @click.native="func"

    给组件一个ref属性，通过this.$refs.scroll可以直接访问scroll组件里面的数据 
    
    probetype 的值不同 决定了是否实时监听  

13.上拉加载更多 
    加载完后要调用 finishPullUp 事件，否则没办法在到底后继续加载

    一个BUG，scroll是会计算可上拉的距离的，图片是异步加载，所以计算出来的高度比实际的高度要低
    加载完图片后，页面无法继续上移 
    解决办法：在图片加载完后调用fefresh方法重新计算高度
    Pro: 怎么知道图片加载完成了  每张图片加载完成后，都调用一次refresh方法 
    
    父子组件传值 
    兄弟组件传值？
    
    图片加载完毕 @load，但是这个在gooslidtItem里发生，刷新在scroll组件里，怎么联系起来
    1. 子组件将事件冒泡，统一在home页面处理，太过麻烦
    2. vuex监听加载完毕的状态，home页面来处理
    3. 事件总线，管理事件。 this.$bus.$emit()  this.$bus.$on() 
        先要注册事件总线 发送一个vue实例 
    
    加载图片能滑动了，但是加载到分解点的图时会卡顿一下 
    
    对于频繁调用refresh这个问题，可以使用防抖、节流函数 debounce/throttle 这两个练习一下 
    
    mounted图片都不一定加载完毕了 

14.解决导航栏失效的问题 
    监听导航栏的位置，然后设置属性 
    不能在mounted里监听，此时图片不一定完全加载完毕，所以scrollTop属性不对 
    一般轮播图是最晚加载完的，在这里监听

    this.$refs.tabControl2.$el.offsetTop  $el 获取组件上的元素 
    
    根据滚动位置动态改变tab-control的显示 
        加个fixed的样式 导致，脱离文档流和不能正常显示 
        再设置一个tab-control，在合适的时候出现 
        需要解决tab-control不同步的问题  

15.让home保持原来的状态 
    keep-alive 首页不销毁
    记录原来的位置  acitved deactived 记录状态  滚动到指定位置 saveY 

    ? computed的作用 

详情页的配置 
16.跳到详情页
      this.$router.push('/detail/' + this.goodsItem.iid)

      出现一个bug，点进详情页后，退出，换一个点击，进去的还是之前的详情页 
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


    后面的视频还不少，全部看完太费时间了，完成页面的主要内容，然后上线，准备简历（关于项目实现了哪些功能，
    怎么实现的着重讲），今天项目后来做一做就准备上线吧，一边上线一边准备新的功能 
    
    array.find(func) 返回符合条件的元素，如果没有，返回undefined
    
    vuex的代码改进，先跳过？？

20.部署到服务器 
    

    1.部署到本地 
            打包项目  Npm  run bundle 
            下载nginx 稳定版的Windows版本 启动 
            将打包的文件dist丢到nginx的html文件夹下 
            通过localhost访问即可 
    windows启动nginx，进入安装文件夹双击exe文件，修改nginx.conf文件来修改项目启动的位置 
    
    2.部署到远程服务器 
        购买阿里云服务器 使用centOS系统 
        安装nginx复杂一点  通过终端命令去装系统 yum linux下的安装包管理工具 
         ssh登录到远程主机上，mac上有这个ssh,windows是没有的  
    
        win需要借助工具来连接，winSCP  
        winscp主要是删除，上传文件的时候有个图形界面，方便。
         暂时不需要，（putty 输入命令行的。） （secureCRT也可以连接）
    
        yum install nginx 网页上就可以直接连接，阿里云提供的服务 
        systemctl start nginx.service 启动nginx服务
        systemctl enable nginx.service  跟随系统启动 
    
        部署完成后是无法通过公网IP直接访问的，需要进行安全配置，打开80端口，允许其被访问 
    
        linux下怎么重启nginx
            查看进程号：ps -ef|grep nginx
            杀死进程： kill -QUIT 2072
            启动服务： systemctl start nginx.service 


        总结一下： 
            需要用到的软件 
                1. winSCP 客户端图形界面，可以直接对文件进行修改 
                2. 阿里云提供的网页版workbench，可以通过命令行对服务器进行操作 


个人详情页 
    那些图标哪里来的 在assets里 svg图标怎么导入，后面再看吧，先不管了

    两栏布局怎么实现 uni-app用的是flex布局，左右两块分别指定一定宽度

    mutations里的每个方法最好只做一件事。同步操作 commit 
    action 异步操作 dispatch


    ...mapGetters() 可以传入数组或对象 
    可以让组件里的计算属性直接使用getters里的方法 
    
    methods里的方法是需要调用的，computed是经过计算的，跟created差不多
    
    商品逐个选中后，怎么让全选按钮亮起来 
    
    for ... of   
    
     Error in created hook: "TypeError: Cannot read property 'maitKey' of undefined"
     感觉是在created里调用这个函数的时候，数据还未初始化？
    
     git 当前的内容没有commit 切换到另一个分支再切回来内容会丢失不

项目中遇到的一些问题及解决方案


     PRO: vue中怎么导入svg图片 直接导入 <imr src="">
     PRO: 从dev分支复制过来的分类页，报错module not found，重启下项目就行了  
    
    二十：vuex的补充
        Actions可以返回一个Promise
        mapActions的映射关系    
    
        如果想让toast可以在任意地方被调用，可以像组件一样注册   自定义插件 
