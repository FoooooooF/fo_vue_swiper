<template>
    <div class="app">
        <v-title :title="{title:'moudle2'}" />
        {{msg}}
    </div>
</template>
<script>
import Title from "../common/title.vue";
export default {
    name:"module2",
    data(){
        return {
            msg:"this is a tempalte2 test",
            title:{
                title:"", //主标题
                url:"", //跳转链接
                subtitle:"", //副标题
                more:"", //更多
            }
        }
    },
    components:{
        "v-title":Title
    },
    created(){
        ///获取vue根实例上的额外属性
        console.log(this.$root);
        console.log(this.$root.$options.module_id);
    },
    mounted(){
        //获取载入点的ID,获取个性化数据
        // console.log(this.$root);
        // console.log(this.$el.parentElement.id);
        // window.mountpoint=this.$el;
    }
}
</script>
<style lang="css" scoped>
    .app{
        color: orangered;
    }
</style>