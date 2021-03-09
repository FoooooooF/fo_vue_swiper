<template>
    <div class="app">
        <h3 class="app-title">1. 基本</h3>
        <!-- @getIndex="getIndex" -->
        <Swiper :config="config1"  v-model="selected">
            <swiperItem v-for="(v,i) in list" :key="i" >
                 <img class="swiper-img" :src="v.url" alt="">
            </swiperItem>
        </Swiper>
        <ul class="pagination" >
            <li v-for="i in list.length" :key="i" class="pagination-item"
                :class="{active:selected===i-1}"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                selected:0,
                list:[
                    {key:"1",url:"https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360"},
                    {key:"2",url:"https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360"},
                    {key:"3",url:"https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360"}
                ],
                config1:{
                    autoPlay: true, //自动滚动,
                    pagination:{
                        show:true,
                        horizontalCenter:true
                    }
                },
            }
        },
        mounted(){
            setTimeout(()=>{
                this.list=[
                    {key:"2",url:"https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360"},
                    {key:"3",url:"https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360"},
                    {key:"1",url:"https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360"},
                ];
            },1000)
             
        },
        methods:{
            getIndex(index){
                // console.log(index);
                this.selected=index
            }
        }
    }
</script>
<style lang="less" >
    body{
        margin: 0;
        padding: 0;
    }
    .app{
        position: relative;
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
    .swiper-img{
        width: 100%;
        height: 100%;
    }
    .pagination {
            // position: absolute;
            right: 10px;
            bottom: 10px;
            z-index: 20;
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: center;

            &-item {
                float: left;
                margin-right: 6px;
                // background-color: rgba(255, 255, 255, 0.5);
                background-color: #999;
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 4px;

                &:last-child {
                    margin-right: 0;
                }

                &.active {
                    // background-color: rgba(255, 255, 255, 1);
                    background-color: red;
                }
            }
        }
</style>