# fo_vue_swiper
一个基于vue的,轻量级的,移动端轮播插件. [示例地址](https://fooooooof.github.io/fo_vue_swiper/)

> *提示*  
> 只适合移动端使用;  
> 每个滑块(slide)的宽度/高度一致;  
> 垂直方向的轮播不支持一屏多块,分页和滑块居中
## 使用
1. 在vue项目中安装 fo_vue_swiper
```bash
npm install fo_vue_swiper --save
```
2. 在webpack入口文件中配置swiper插件
```javascript
//main.js
import swiper from "fo_vue_swiper"
Vue.use(swiper)
```
3. 在`.vue`中中使用`<Swiper />`标签
- 滑块(slide)自定义,滑块通过vue插槽的方式注入到Swiper中组件中
- 分页器自定义,通过提供`.swiper-pagination`和`.swiper-pagination-item`连个class名称,覆盖默认样式,来自定义分页器的样式.
```html
<!--App.vue 使用实例-->
<template>
    <div class="app">
        <Swiper :config="config">
            <div class="slides" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                config: {
                    autoPlay: true, //自动轮播,
                    pagination:{
                        show:true,
                        horizontalCenter:true
                    }
                }
            }
        },
    }
</script>
<style lang="css" scoped >
    .slides {
        flex-shrink: 0;
        z-index: 10;
        width: 100vw;
        background-color: #aaa;
        border-radius: 5px;
        height: 200px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }
</style>
```

## 参数说明
> 通过`config`传值来进行轮播插件的初始化配置

|参数|默认值|默认值类型|说明|
|---|---|---|---|
|direction| "horizontal"|String|水平(horizontal)或垂直(vertical)|
|autoPlay| false|Boolean|自动滚动|
|duration| 500|Number|一次滑动需要走多久|
|interval| 2500|Number|两次滑动间隔的时间|
|loop| false|Boolean|循环播放|
|centeredSlides| false|Boolean|滑块水平居中|
|noSwiping| false|Boolean|不允许滑动|
|pagination|null|Object| 分页|
|pagination.show|true|Boolean| 显示分页器|
|pagination.horizontalCenter|true|Boolean| 分页器水平居中|

## 开发
```
npm install
npm run dev
```
## npm组件打包
```
npm run build:npm
```
## 示例docs打包
```
npm run build:page
```

## 参考
- Api 设计参考swiper.js
- [手把手教你封装 Vue 组件，并使用 npm 发布](https://juejin.im/post/5b45df255188251b1d474860)