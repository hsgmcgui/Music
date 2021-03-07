<template>
    <div class="fanhui" @click="$emit('isshow-xxx')">
        <div></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.fanhui{
    div{
        width: 15px;
        height: 15px;
        border-top: 2px solid #fff;
        border-left: 2px solid #fff;
        margin: 13px 0 0 10px;
        transform: rotate(-45deg);
    }
}
</style>