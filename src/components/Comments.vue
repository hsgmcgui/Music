<template>
    <div class="comments">
        <h3>最新评论({{comments.length}})</h3>
        <ul>
            <CommentsList v-for="(item,index) in comments" :key="index" :item="item"></CommentsList>
        </ul>
    </div>
</template>

<script>
import CommentsList from "@/components/CommentsList.vue"
export default {
    components: {
        CommentsList
    },
    props: ["comments"]
}
</script>

<style scoped lang="less">
    .comments{
        width: 100%;
        h3{
            width: 100%;
            height: 23px;
            line-height: 23px;
            font-size: 12px;
            color: #333;
            padding: 0 10px;
            ul{
                width: 100%;
            }
        }
    }
</style>