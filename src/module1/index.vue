<template>
    <div class="app">
        <v-title :title="{title:'moudle1'}" />
        {{msg}}
    </div>
</template>
<script>
import Title from "../common/title.vue";
export default {
    name:"module1",
    data(){
        return {
            msg:"this is a tempalte test 111"
        }
    },
    components:{
        "v-title":Title
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