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
        <ul class="swiper-pagination" ref="swiper-pagination" v-if="mergeConfig.pagination">
            <li v-for="i in slidesLength" :key="i" class="swiper-pagination-item"
                :class="{active:mergeConfig.loop?selected==i+1:selected==i-1}"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"Swiper",
        data() {
            return {
                timer: null, //自动轮播定时器
                container: {}, //container容器el
                mergeConfig: {}, //合并后的参数
                slidesLength: 1, //滑块数量
                slides: [], //滑块的属性
                selected: 1, //当前的滑块,
                startPos: { //滑动的初始x,y坐标
                    x: 0,
                    y: 0
                },
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
                        centeredSlides: true, //滑块居中显示
                        pagination: { //分页设置
                            show: true, //显示
                            horizontalCenter: true, //水平居中
                        }
                    }
                }
            },
        },
        created() {
            //参数初始化
            this.mergeConfig = {
                direction: this.config.direction || "horizontal", //水平(horizontal)或垂直(vertical)。
                autoPlay: this.config.autoPlay === true ? true : false, //自动滚动
                duration: this.config.duration || 500, //一次滑动需要走多久
                interval: this.config.interval || 2500, //两次滑动间隔的时间
                loop: this.config.loop === true ? true : false, //循环播放
                noSwiping: this.config.noSwiping === true ? true : false, //不允许滑动
                centeredSlides: this.config.centeredSlides === true ? true : false, //滑块居中
                pagination: this.config.pagination || null //分页设置
            }
            this.mergeConfig.direction = this.mergeConfig.direction.toLowerCase();
            if (!["horizontal", "vertical"].includes(this.mergeConfig.direction)) {
                throw new Error("方向参数(direction)错误");
                this.mergeConfig.direction = "horizontal";
            };
            this.mergeConfig.autoPlay && (this.mergeConfig.loop = true); //如果自动轮播开启,loop自动开启
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
                this.mergeConfig.loop ? this.selected = 2 : this.selected = 0;
                if (this.mergeConfig.loop && !this.timer) {
                    this.initLoop();
                }
                if (this.mergeConfig.pagination && this.mergeConfig.pagination.show === true && this.mergeConfig
                    .pagination.horizontalCenter === true) {
                    this.paginationCenter();
                }
                this.initSildes();
                this.mergeConfig.loop ? this.select(2) : this.select(0);
                if (this.mergeConfig.autoPlay && this.mergeConfig.loop && !this.timer) { //自动播放
                    this.initInterval();
                }
            },
            //分页器居中
            paginationCenter() {
                let pagin = this.$refs["swiper-pagination"];
                this.$nextTick(() => {
                    pagin.style.left = "50%";
                    pagin.style.right = "auto";
                    pagin.style["marginLeft"] = (pagin.clientWidth / 2 * -1) + "px";
                })
            },
            // 初始化滑块数据
            initSildes() {
                this.slides = [];
                let slideWidth = this.container.children[0].offsetWidth; //滑块的宽度
                for (let i = 0; i < this.container.children.length; i++) {
                    if (this.mergeConfig.direction === "vertical") {
                        this.slides.push({
                            offsetLeft: this.container.children[i].offsetTop,
                            index: i,
                        })
                    } else {
                        let viewportWidth = this.container.parentNode.clientWidth;
                        let offset = viewportWidth - slideWidth;
                        //滑块居中
                        let centerX = 0;
                        if (this.mergeConfig.centeredSlides) {
                            centerX = offset / 2;
                            centerX < 0 && (centerX = 0);
                        }
                        //最后一个滑块
                        if (i === this.container.children.length - 1) {
                            this.slides.push({
                                offsetLeft: this.container.children[i].offsetLeft - offset,
                                index: i,
                            })
                        } else {
                            this.slides.push({
                                offsetLeft: this.container.children[i].offsetLeft - centerX,
                                index: i,
                            })
                        }
                    }
                }
            },
            //初始化循环
            initLoop() {
                let slides = this.container.children;
                if (this.slidesLength > 1) {
                    let fragment1 = document.createDocumentFragment();
                    let fragment2 = document.createDocumentFragment();
                    fragment1.appendChild(slides[slides.length - 2].cloneNode(true));
                    fragment1.appendChild(slides[slides.length - 1].cloneNode(true));
                    fragment2.appendChild(slides[0].cloneNode(true));
                    fragment2.appendChild(slides[1].cloneNode(true));
                    this.container.insertBefore(fragment1, slides[0]) //向前insert
                    this.container.appendChild(fragment2); //向最后append
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
                if (this.mergeConfig.noSwiping) {
                    return;
                }
                this.claerTimer()
                this.startPos.x = e.touches[0].clientX;
                this.startPos.y = e.touches[0].clientY;
            },

            touchmove(e) { //处理滑块的跟手效果
                this.claerTimer()
                if (this.mergeConfig.noSwiping) {
                    return;
                }
                let slide = 0;
                if (this.mergeConfig.direction === "vertical") {
                    slide = e.touches[0].clientY - this.startPos.y;
                } else {
                    slide = e.touches[0].clientX - this.startPos.x;
                }
                if (!this.mergeConfig.loop) { //非轮播的情况下
                    if (this.selected === 0 && slide > 0) { //第一个,且向右滑动
                        return
                    } else if (this.selected === this.slides.length - 1 && slide < 0) { //最后一个,且向左滑动
                        return
                    }
                }
                let offsetLeft = this.slides[this.selected].offsetLeft * -1;
                this.container.style.transform = `translate3d(${offsetLeft+slide}px, 0px, 0px)`;
            },
            touchend(e) {
                if (this.mergeConfig.noSwiping) {
                    return;
                }
                let endX = e.changedTouches[0].clientX;
                let endY = e.changedTouches[0].clientY;
                let distance = 0;
                if (this.mergeConfig.direction === "vertical") { //垂直方向
                    distance = endY - this.startPos.y;
                } else { //水平方向
                    distance = endX - this.startPos.x;
                }
                if (distance > 40) {
                    this.select(this.selected - 1);
                } else if (distance < -40) {
                    this.select(this.selected + 1);
                } else { //没有达到滑动的阈值,进行复位
                    this.select(this.selected);
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
                    if (this.selected === this.slides.length - 2) { //最后一个
                        this.selected = 2;
                        this.setPosition(x);
                        setTimeout(() => {
                            let x = this.slides[2].offsetLeft * -1;
                            this.setPosition(x, 0);
                        }, this.mergeConfig.duration)
                    }
                    if (this.selected === 1) { //第一个
                        this.selected = this.slides.length - 3;
                        this.setPosition(x);
                        setTimeout(() => {
                            let x = this.slides[this.slides.length - 3].offsetLeft * -1;
                            this.setPosition(x, 0);
                        }, this.mergeConfig.duration)
                    } else {
                        this.setPosition(x);
                    }
                } else { //非轮播情况下
                    if (this.selected === 0 && index < this.selected) { //第一个
                        return
                    } else if (this.selected === this.slides.length - 1 && index > this.selected) { //最后一个
                        return
                    }
                    this.selected = index;
                    let x = this.slides[index].offsetLeft * -1;
                    this.setPosition(x);
                }
            },
            setPosition(distance, time) {
                if (time === 0) {
                    this.container.style.transition = `0ms`;
                } else {
                    this.container.style.transition = `${this.mergeConfig.duration}ms`;
                }
                if (this.mergeConfig.direction === "vertical") {
                    this.container.style.transform = `translate3d(0px, ${distance}px, 0px)`;
                } else {
                    this.container.style.transform = `translate3d(${distance}px, 0px, 0px)`;
                }
            },
            claerTimer() {
                clearInterval(this.timer);
                this.timer = null;
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
            right: 10px;
            bottom: 10px;
            z-index: 20;
            list-style: none;

            &-item {
                float: left;
                margin-right: 6px;
                background-color: rgba(255, 255, 255, 0.5);
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 4px;

                &:last-child {
                    margin-right: 0;
                }

                &.active {
                    background-color: rgba(255, 255, 255, 1);
                }
            }
        }
    }


    .slides {
        flex-shrink: 0;
        z-index: 10;
        width: 85vw;
        background-color: #aaa;
        margin-right: 5vw;
        border-radius: 5px;
        height: 200px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }
</style>