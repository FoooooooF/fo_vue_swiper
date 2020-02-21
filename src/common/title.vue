<template>
    <div class="title">
        {{title.title}}
    </div>
</template>
<script>
export default {
    name:"c-title",
    props:{
        title:{
            type:Object,
            default:function(){
                return {
                    title:"I'm the title"
                }
            }

        }
    }
}
</script>
<style lang="less" scoped>
    .title{
        color: #333;
        line-height: 60px;
        font-size: 20px;
        font-weight:400;
    }
</style>