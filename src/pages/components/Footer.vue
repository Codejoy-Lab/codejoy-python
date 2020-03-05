<template>
    <div class="footer-wrap">
        <div class="prograss-wrap">
            <!-- <el-progress  stroke-width="10" color="#FFC300" :percentage="90"></el-progress> -->
        </div>
    </div>

</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
    .footer-wrap{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .prograss-wrap{
        width: 50%;
        height:fit-content;
        margin: 0 auto;
    }
</style>
