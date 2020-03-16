<template>
    <div class="app">
        <h3>1. 基本</h3>
        <pre>
            config1:{
                autoPlay: true, //自动滚动,
                pagination:{
                    show:true,
                    horizontalCenter:true
                }
            }
        </pre>
        <Swiper :config="config1">
            <div class="slides1" >
                <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides1">
                <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
            <div class="slides1">
                <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt="">
            </div>
        </Swiper>
        <h3>2.一屏多图居中&分页&轮播</h3>
        <pre>
            config2: {
                autoPlay: true, //自动滚动,
                centeredSlides:true, //滑块居中
                pagination:{
                    show:true,
                    horizontalCenter:true
                }
            }
        </pre>
        <Swiper :config="config2">
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
    pre{
        padding: 10px 0;
        background-color: #000;
        color: #fff;
    }
    .slides1 {
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
    .slides2 {
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
</style>