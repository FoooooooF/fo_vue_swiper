<template>
    <div class="swiper" @touchmove="(e)=>{e.preventDefault()}">
        <div class="swiper-container" ref="swiper-container" @touchstart="touchstart" @touchmove="touchmove"
            @touchend="touchend">
            <div class="slides" index="0">
                <!-- <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                1 </div>
            <div class="slides" index="1">

                <!-- <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                2 </div>
            <div class="slides" index="2">

                <!-- <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                3 </div>
        </div>
        <ul class="swiper-pagination" v-if="mergeConfig.pagination">
            <li v-for="i in slidesLength" :key="i" class="swiper-pagination-item"
                :class="{active:mergeConfig.loop?selected==i:selected==i-1}"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                timer: null, //自动轮播定时器
                className: '', //容器类名称
                container: {}, //container容器el
                mergeConfig: {}, //合并后的参数
                slidesLength: 1, //滑块数量
                slideWidth: 0, //滑块的宽度
                slides: [], //滑块的属性
                selected: 1, //当前的滑块 从1开始,
                preSelected: 1, //前一个选择的块,
                startX: 0, //滑动的初始x坐标
            }
        },
        props: {
            config: {
                type: Object,
                default: function () {
                    return {
                        direction: "horizontal", //水平(horizontal)或垂直(vertical)。
                        autoPlay: false, //自动滚动
                        duration: 500, //一次滑动需要走多久
                        interval: 2500, //两次滑动间隔的时间
                        loop: false, //循环播放
                        noSwiping: false, //不允许滑动
                        offset: 0, //滑动偏移量
                        pagination: { //分页设置
                            top: "auto",
                            bottom: "auto",
                            left: "auto",
                            right: "auto",
                        }
                    }
                }
            },
        },
        created() {
            this.mergeConfig = {
                direction: this.config.direction || "horizontal", //水平(horizontal)或垂直(vertical)。
                autoPlay: this.config.autoPlay || false, //自动滚动
                duration: this.config.duration || 500, //一次滑动需要走多久
                interval: this.config.interval || 2500, //两次滑动间隔的时间
                loop: this.config.loop || false, //循环播放
                noSwiping: this.config.noSwiping || false, //不允许滑动
                offset:this.config.offset || 0, //滑动偏移量
                pagination: this.config.pagination || { //分页设置
                    top: "auto",
                    bottom: "auto",
                    left: "auto",
                    right: "auto",
                }
            }
        },
        mounted() {
            this.init();
            window.addEventListener("resize", () => {
                this.initSildes();
            })
        },
        beforeDestroyed() {
            clearInterval(this.timer);
        },
        methods: {
            //初始化
            init() {
                this.container = this.$refs["swiper-container"]; //获取swiper容器
                this.slidesLength = this.container.children.length; //滑块的数量
                this.slideWidth = this.container.children[0].offsetWidth; //滑块的宽度
                this.mergeConfig.loop ? this.selected = 1 : this.selected = 0;
                if (this.mergeConfig.loop && !this.timer) {
                    this.initLoopSlides();
                }
                this.initSildes();
                this.mergeConfig.loop ? this.select(1) : this.select(0);
                if (this.mergeConfig.autoPlay && this.mergeConfig.loop && !this.timer) { //自动播放
                    this.initInterval();
                }
            },
            // 初始化滑块数据
            initSildes() {
                this.slides = [];
                for (let i = 0; i < this.container.children.length; i++) {
                    this.slides.push({
                        offsetLeft: this.container.children[i].offsetLeft+(this.mergeConfig.offset),
                        index: i,
                    })
                }
            },
            //初始化循环
            initLoopSlides() {
                var slides = this.container.children;
                if (this.slidesLength > 1) {
                    var cloneDom1 = slides[0].cloneNode(true) //向最后append
                    var cloneDom2 = slides[this.slidesLength - 1].cloneNode(true) //向最前append
                    this.container.insertBefore(cloneDom2, slides[0])
                    this.container.appendChild(cloneDom1)
                }
            },
            //初始化定时器
            initInterval() {
                this.timer = setInterval(() => {
                    let index = this.selected + 1
                    this.select(index)
                }, this.mergeConfig.interval)
            },
            //滑动事件
            touchstart(e) {
                clearInterval(this.timer);
                this.preSelected = this.selected;
                this.startX = e.touches[0].clientX;
            },
            touchmove(e) {
                console.log("滑动")
            },
            touchend(e) {
                let endX = e.changedTouches[0].clientX;
                let distance = endX - this.startX;
                if (distance > 60) {
                    this.select(this.selected - 1);
                } else if (distance < -60) {
                    this.select(this.selected + 1);
                }
                if (this.mergeConfig.autoPlay) {
                    this.initInterval();
                }
            },
            //切换选择的滑块
            select(index) {
                //区分轮播和非轮播的情况
                if (this.mergeConfig.loop) { //轮播的情况下
                    this.selected = index;
                    let x = this.slides[index].offsetLeft * -1;
                    if (this.selected === this.slides.length - 1) { //最后一个
                        this.selected = 1;
                        this.container.style.cssText = `transform:translate3d(${x}px, 0px, 0px);
                        transition:${this.mergeConfig.duration}ms;`
                        setTimeout(() => {
                            this.container.style.transition = "0ms linear";
                            let x = this.slides[1].offsetLeft * -1;
                            this.container.style.transform =`translate3d(${x}px, 0px, 0px)`;
                        }, this.mergeConfig.duration)
                    }
                    if (this.selected === 0) { //第一个
                        this.selected = this.slides.length - 2;
                        this.container.style.cssText = `transform:translate3d(${x}px, 0px, 0px);
                        transition:${this.mergeConfig.duration}ms;`
                        setTimeout(() => {
                            this.container.style.transition = "0ms linear";
                            let x = this.slides[this.slides.length - 2].offsetLeft * -1;
                            this.container.style.transform =`translate3d(${x}px, 0px, 0px)`;
                        }, this.mergeConfig.duration)
                    } else {
                        this.container.style.cssText = `transform:translate3d(${x}px, 0px, 0px);
                        transition:${this.mergeConfig.duration}ms;`
                    }
                } else { //非轮播情况下
                    if (this.selected === 0 && index < this.selected) { //第一个
                        return
                    } else if (this.selected === this.slides.length - 1 && index > this.selected) { //最后后一个
                        return
                    }
                    this.selected = index;
                    let x = this.slides[index].offsetLeft * -1;
                    this.container.style.cssText = `transform:translate3d(${x}px, 0px, 0px);
                    transition:${this.mergeConfig.duration}ms;`
                }

            }

        }
    }
</script>
<style lang="less" scoped>
    .swiper {
        position: relative;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        user-select: none;
        background-color: #eee;

        &-container {
            display: flex;
            width: 100%;
            flex-direction: row;
        }

        &-pagination {
            position: absolute;
            right: 0;
            bottom: 10px;
            z-index: 20;
            list-style: none;

            &-item {
                float: left;
                margin-right: 5px;
                background-color: blue;
                width: 10px;
                height: 10px;
                border-radius: 5px;

                &.active {
                    background-color: red;
                }
            }
        }
    }

    .slides {
        flex-shrink: 0;
        z-index: 10;
        width: 100vw;
        // width: 85vw;
        background-color: #aaa;
        // margin-right: 5vw;
        // border-radius: 5px;
        height: 200px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }
</style>