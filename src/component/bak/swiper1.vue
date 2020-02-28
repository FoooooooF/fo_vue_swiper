<template>
    <div class="swiper" @touchmove="(e)=>{e.preventDefault()}">
        <div class="swiper-container" ref="swiper-container" @touchstart="s" @touchmove="m" @touchend="e">
            <div class="slides">
                <!-- <img src="https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                1
            </div>
            <div class="slides">
                <!-- <img src="https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                2
            </div>
            <div class="slides">
                <!-- <img src="https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360" alt=""> -->
                3
            </div>
        </div>
        <ul class="swiper-pagination">
            <li v-for="i in slidesLength" :key="i" class="swiper-pagination-item"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                _width: 0, //长度
                auto: true, //自动轮播
                slideing: true, //正在滑动
                timer: '', //自动轮播定时器
                className: '', //容器类名称
                container: {}, //container容器el
                containerWidth: 0, //container容器宽度
                mergeConfig: {}, //合并后的参数
                t: {
                    sx: 0,
                    s: 0,
                    m: 0,
                    e: 0
                },
                index: 1, //当前索引
                slidesLength: 1, //滑块数量
                slideWidth: 0, //滑块的宽度
                containerOffsetWidth: 0, //容器的偏移量

            }
        },
        props: {
            config: {
                type: Object,
                default: function () {
                    return {
                        direction: "horizontal", //水平(horizontal)或垂直(vertical)。
                        autoPlay: true, //自动滚动
                        duration: 500, //一次滑动需要走多久
                        interval: 2500, //两次滑动间隔的时间
                        loop: true, //循环播放
                        noSwiping: false, //不允许滑动
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
                autoPlay: this.config.autoPlay || true, //自动滚动
                duration: this.config.duration || 500, //一次滑动需要走多久
                interval: this.config.interval || 2500, //两次滑动间隔的时间
                loop: this.config.loop || true, //循环播放
                noSwiping: this.config.noSwiping || false, //不允许滑动
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
        },
        destroyed() {
            clearInterval(this.timer);
        },
        methods: {
            //初始化
            init() {
                this.container = this.$refs["swiper-container"]; //获取swiper容器
                this.slidesLength = this.container.children.length; //滑块的数量
                this.slideWidth = this.container.children[0].offsetWidth; //滑块的宽度
                this.containerWidth = this.container.offsetWidth //容器宽度
                // this.initHeightWidth();
                this.initLoopSlides();
                if (this.mergeConfig.autoPlay && this.mergeConfig.loop) { //自动播放
                    // this.mergeConfig.loop=true; //必须循环
                    // this.container.style.transiton=`${this.mergeConfig.duration}ms`;
                    this.initInterval();
                }

            },
            
            //初始化循环
            initLoopSlides() {
                var slides = this.container.children;

                // this.slidesLength = SlideDom.length
                if (this.slidesLength > 1) {
                    var cloneDom1 = slides[0].cloneNode(true) //向最后append
                    var cloneDom2 = slides[this.slidesLength - 1].cloneNode(true) //向最前append
                    this.container.insertBefore(cloneDom2, slides[0])
                    this.container.appendChild(cloneDom1)
                    this.container.style.cssText = `transform:translate3d(-${this.slideWidth}px, 0px, 0px);`
                    // this._width = this.container.offsetWidth
                    // this.dom = this.container.style
                }
            },
            //初始化定时器
            initInterval() {
                this.timer = setInterval(() => {
                    this.slideWidth = this.container.children[0].offsetWidth;
                    this.containerOffsetWidth = this.containerOffsetWidth + this.slideWidth;
                    if (this.mergeConfig.loop === true) {
                        if (this.containerOffsetWidth >= (this.slidesLength + 1) * this.slideWidth) {
                            setTimeout(() => {
                                this.container.style.transition = "0ms linear";
                                this.containerOffsetWidth = this.slideWidth;
                                this.container.style.transform =
                                    `translate3d(-${this.containerOffsetWidth}px, 0px, 0px)`;
                            }, this.mergeConfig.duration)
                        }
                    }
                    this.container.style.cssText = `
                    transform:translate3d(-${this.containerOffsetWidth}px, 0px, 0px);
                    transition:${this.mergeConfig.duration}ms;`
                }, this.mergeConfig.interval)
            },
            //滑动事件
            s(e) {
                console.log(e)
                clearInterval(this.timer);
                // 记录当前位置
                this.t.sx = this.getTransform()
                this.t.s = e.touches[e.touches.length - 1].clientX
            },
            m(e) {
                console.log(e)
                clearInterval(this.timer);
                this.t.m = e.touches[e.touches.length - 1].clientX - this.t.s
                this.setTransform(this.t.m + this.t.sx)
            },
            e(e) {
                clearInterval(this.timer);
                this.setTransform(this.t.m + this.t.sx)
                var x = this.getTransform()
                x += this.t.m > 0 ? this.containerWidth * 0.3 : this.containerWidth * -0.3
                this.index = Math.round(x / this.containerWidth) * -1
                // this.wh('touch')
                this.initInterval();
            },
            //设置移动值
            setTransform(x) {
                this.container.style.transform = `translate3d(${x}px, 0px, 0px)`
            },
            getTransform() {
                var x = this.container.style.transform;
                x = x.substring(12)
                x = x.match(/(\S*)px/)[1]
                return Number(x)
            },
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
            bottom: -10px;
            z-index: 20;
            list-style: none;

            &-item {
                float: left;
                margin-right: 5px;
                background-color: blue;
                width: 10px;
                height: 10px;
                border-radius: 5px;
            }
        }
    }

    .slides {
        flex-shrink: 0;
        z-index: 10;
        width: 100vw;
        background-color: red;
        height: 200px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }
</style>