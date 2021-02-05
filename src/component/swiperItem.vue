<template>
    <div class="swiper-item">
        <slot />
    </div>
</template>
<script>
export default {
    name:"swiperItem",
    data(){
        return {

        }
    },
    props:{

    }
}
</script>
<style lang="less" scoped>
    .swiper-item{
        width: 100vw;
        display: block;
    }
</style>