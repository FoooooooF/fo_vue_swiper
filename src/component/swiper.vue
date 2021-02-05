<template>
    <div class="swiper" @touchmove="(e)=>{e.preventDefault()}">
        <div class="swiper-container" 
            ref="swiper-container" 
            :style="{'flex-direction':mergeConfig.direction==='vertical'?'column':''}"
            @touchstart="touchstart" 
            @touchmove="touchmove"
            @touchend="touchend"
            @touchcancel="touchend">
           <slot />
        </div>
    </div>
</template>
<script>
    import {clone} from "./utils.js"
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
            value:Number,
            config: {
                type: Object,
                // default: function () {
                //     return {
                //         direction: "horizontal", //水平(horizontal)或垂直(vertical)。
                //         autoPlay: false, //自动滚动
                //         duration: 500, //一次滑动需要走多久
                //         interval: 2500, //两次滑动间隔的时间
                //         loop: false, //循环播放
                //         noSwiping: false, //不允许滑动
                //         centeredSlides: false, //滑块居中显示
                //         pagination: { //分页设置
                //             show: true, //显示
                //             horizontalCenter: true, //水平居中
                //         }
                //     }
                // }
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

            this.initLoop()
            console.log('created',this.$slots.default);
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
        beforeUpdate(){
            // 数据更新时重新检查loop元素
            this.initLoop(true);
        },
        methods: {
            //初始化
            init() {
                // this.selected=this.value;
                this.container = this.$refs["swiper-container"]; //获取swiper容器
                // this.slidesLength = this.container.children.length; //滑块的数量
                this.mergeConfig.loop ? this.selected = 2 : this.selected = 0;
                
                // if (this.mergeConfig.pagination && this.mergeConfig.pagination.show === true && this.mergeConfig
                //     .pagination.horizontalCenter === true) {
                //     this.paginationCenter();
                // }
                this.initSildes();
                this.mergeConfig.loop ? this.select(2) : this.select(0);
                if (this.mergeConfig.autoPlay && this.mergeConfig.loop && !this.timer) { //自动播放
                    this.initInterval();
                }
            },
            //分页器居中
            // paginationCenter() {
            //     let pagin = this.$refs["swiper-pagination"];
            //     this.$nextTick(() => {
            //         pagin.style.left = "50%";
            //         pagin.style.right = "auto";
            //         pagin.style["marginLeft"] = (pagin.clientWidth / 2 * -1) + "px";
            //     })
            // },
            // 初始化滑块数据
            initSildes() {
                this.slides = [];
                let slideWidth = this.container.children[0].offsetWidth; //滑块的宽度
                for (let i = 0; i < this.container.children.length; i++) {
                    if (this.mergeConfig.direction === "vertical") {
                        console.dir(this.container.children[i]);
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
            initLoop(update) {
                //有效元素数量
                let slot=this.$slots.default.filter((item)=>{
                    return item.tag==="vue-component-2-swiperItem"
                });
                this.slidesLength=slot.length;
                // &&!this.timer
                if (this.mergeConfig.loop) {
                    if(slot.length>1){
                        let first_1=clone(slot[0]);
                        first_1.key=first_1.key+"_11";
                        let first_2=clone(slot[1]);
                        first_2.key=first_1.key+"_12";

                        let last_1=clone(slot[slot.length-1]);
                        last_1.key=last_1.key+"_21";
                        let last_2=clone(slot[slot.length-2]);
                        last_2.key=last_1.key+"_22";
                       
                        slot.push(first_1);
                        slot.push(first_2);
                        slot.unshift(last_1);
                        slot.unshift(last_2);
                        this.$slots.default=slot;
                        this.slidesLength=slot.length-4;
                    }else{
                        this.mergeConfig.loop=false;
                    }
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
                if (this.mergeConfig.noSwiping) {
                    return;
                }
                this.claerTimer()
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
                 if (this.mergeConfig.direction === "vertical") {
                    this.container.style.transform = `translate3d(0px, ${offsetLeft+slide}px, 0px)`;
                } else {
                    this.container.style.transform = `translate3d(${offsetLeft+slide}px, 0px, 0px)`;
                }
                
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
                let index1=this.selected-2
                // this.$emit('getIndex',index1);
                this.$emit('input',index1);
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
            flex-wrap: nowrap;
            flex-direction: row;
            width:max-content;
        }

        &-pagination {
            position: absolute;
            right: 10px;
            bottom: 10px;
            z-index: 20;
            list-style: none;
            padding: 0;

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


    // .slides {
    //     flex-shrink: 0;
    //     z-index: 10;
    //     width: 85vw;
    //     background-color: #aaa;
    //     margin-right: 5vw;
    //     border-radius: 5px;
    //     height: 200px;
    //     color: #fff;
    //     font-size: 20px;
    //     text-align: center;
    // }
</style>