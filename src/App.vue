<template>
    <div class="app">
        <Swiper>
            <!-- <Slide>
                    1
            </Slide>
            <Slide>
                    2
            </Slide>
            <Slide>
                    3
            </Slide> -->
        </Swiper>
    </div>
</template>
<script>
    export default {
        name: "module1",
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
<style lang="css" scoped>
    .app {
        color: blue;
    }
</style>