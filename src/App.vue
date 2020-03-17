<template>
    <div class="app">
        <p class="app-tips">该组件紧针对手机端进行开发,<br/>请在手机模式化查看此页面</p>
        <h3 class="app-title">1. 基本</h3>
        <Swiper>
            <div class="slides7" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides7">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides7">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3 class="app-title">2. 一屏两图&滑动</h3>
        <Swiper>
            <div class="slides2" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides2">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides2">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3 class="app-title">3. 一屏两图滑动&自动轮播</h3>
        <pre class="app-pre">
            config1:{
                autoPlay: true, //自动滚动,
                pagination:{
                    show:true,
                    horizontalCenter:true
                }
            }
        </pre>
        <Swiper  :config="config1">
            <div class="slides2" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides2">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides2">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3 class="app-title">4.分页&自动轮播</h3>
        <pre class="app-pre">
            config1:{
                autoPlay: true, //自动滚动,
                pagination:{
                    show:true,
                    horizontalCenter:true
                }
            }
        </pre>
        <Swiper :config="config1">
            <div class="slides7" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides7">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides7">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3 class="app-title">5.一屏三图居中&分页&轮播</h3>
        <pre class="app-pre">
            config: {
                autoPlay: true, //自动滚动,
                centeredSlides:true, //滑块居中
                pagination:{
                    show:true,
                    horizontalCenter:true
                }
            }
        </pre>
        <Swiper :config="config2">
            <div class="slides8" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides8">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides8">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3 class="app-title">5.上下轮播&禁止滑动</h3>
        <p  class="app-tips">一屏多图,滑块居中等功能<br/>在垂直(vertical)模式下没有适配</p>
        <pre class="app-pre">
            config: {
                direction:"vertical", //垂直方向轮播
                autoPlay: true, //自动滚动,
                loop:true,
                noSwiping:true, //禁止滑动
            }
        </pre>
        <Swiper :config="config5" style="height:48vw">
            <div class="slides5" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides5">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides5">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                config1:{
                    autoPlay: true, //自动滚动,
                    pagination:{
                        show:true,
                        horizontalCenter:true
                    }
                },
                config2: {
                    autoPlay: true, //自动滚动,
                    centeredSlides:true, //滑块居中
                    pagination:{
                        show:true,
                        horizontalCenter:true
                    }
                },
                config5: {
                    direction:"vertical", //垂直方向滑动
                    autoPlay: true, //自动滚动,
                    loop:true,
                    noSwiping:true, //禁止滑动
                }
            }
        },
    }
</script>
<style lang="less" >
    body{
        margin: 0;
        padding: 0;
    }
    .app{
        &-title{
            color: #333;
            padding:15px;
            margin: 0;
        }
        &-tips{
            background-color: #f00;
            text-align: center;
            color: yellow;
            font-size: 14px;
            padding: 8px 0;
        }
        &-pre{
            padding-top: 15px;
            background-color: #3D3D3D;
            color: #fff;
        }
    }
    .slides2 {
        flex-shrink: 0;
        z-index: 10;
        width: 75vw;
        background-color: #aaa;
        border-radius: 5px;
        height: 32vw;
        color: #fff;
        margin-right: 15px;
        font-size: 20px;
        text-align: center;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .slides7 {
        flex-shrink: 0;
        z-index: 10;
        width: 100vw;
        background-color: #aaa;
        border-radius: 5px;
        height: 48vw;
        color: #fff;
        font-size: 20px;
        text-align: center;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .slides8 {
        flex-shrink: 0;
        z-index: 10;
        width: 75vw;
        margin-right: 10px;
        border-radius: 5px;
        height: 32vw;
        color: #fff;
        font-size: 20px;
        text-align: center;
        img{
            width: 100%;

        }
    }
    .slides5 {
        flex-shrink: 0;
        z-index: 10;
        width: 100vw;
        margin-right: 10px;
        border-radius: 5px;
        height: 48vw;
        color: #fff;
        font-size: 20px;
        text-align: center;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>