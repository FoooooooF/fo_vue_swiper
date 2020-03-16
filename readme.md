# fo_vue_swiper
> 一个简短精悍移动端,vue轮播图插件  

## 使用
```bash
npm install fo_vue_swiper --save
```
```js
//main.js
import swiper from "fo_vue_swiper"
Vue.use(swiper)
```
```html
<!--App.vue 使用实例-->
<template>
    <Swiper :config="config"  />
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                config: {
                    direction: "horizontal", //水平(horizontal)或垂直(vertical)。
                    autoPlay: false, //自动滚动
                    duration: 500, //一次滑动需要走多久
                    interval: 2500, //两次滑动间隔的时间
                    loop: false, //循环播放
                    noSwiping: false, //不允许滑动
                    offset: 20,
                    pagination: { //分页设置
                        top: "auto",
                        bottom: "auto",
                        left: "auto",
                        right: "auto",
                    }
                }
            }
        },
    }
</script>
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
|noSwiping| false|Boolean|不允许滑动|
|offset| 20|Number|滑动偏移量|
|pagination|true|Boolean| 分页|
## 开发
```
npm install
npm run dev
```
## 打包
```
npm run build
```

## 参考
> Api 设计参考swiper.js
- [手把手教你封装 Vue 组件，并使用 npm 发布](https://juejin.im/post/5b45df255188251b1d474860)