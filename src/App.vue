<template>
    <div class="app">
        <Swiper>
            <Slide>
                    1
            </Slide>
            <Slide>
                    2
            </Slide>
            <Slide>
                    3
            </Slide>
        </Swiper>
    </div>
</template>
<script>
export default {
    name:"module1",
    data(){
        return {
            msg:"this is a tempalte test 111"
        }
    },
    created(){
        console.log(this.$root.$options.module_id);
        // console.log(this.$el.parentElement.id);
    },
    mounted(){
        //获取载入点的ID,获取个性化数据
        console.log(this.$el.parentElement.id);
        // window.mountpoint=this.$el;
    }
}
</script>
<style lang="css" scoped>
    .app{
        color: blue;
    }
</style>