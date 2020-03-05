<template>
<div class="tutorial-wrap">
  <!-- <div class="tutorial-header-wrap">
    <el-button class="fold-icon-button" :icon="icon" circle @click="fold"></el-button>
  </div> -->
  <div class="tutorial-content-wrap">
    <div class='step-wrap'>
      <el-steps direction="vertical" :active="1" :space="50" finish-status="success">
        <el-step title=""></el-step>
        <el-step title=""></el-step>
        <el-step title="" description=""></el-step>
      </el-steps>
    </div>
    <div class="tutorial">Tutorials</div>
  </div>

</div>
</template>

<script>
export default {
  name: 'PythonTutorial',
  data () {
    return {
      tutorialStyle: 'visibility: visible;'
    }
  }
  // methods:{
  //   fold(){
  //     // console.log("clicked")
  //     this.tutorialStyle="visibility: hidden;"
  //   }
  // }

}
</script>

<style scoped>
.tutorial-wrap{
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.step-wrap{
  padding: 10px;
  background:#ECECEE;
  height:inherit;
  width: fit-content;
}
.tutorial{
  width: 100%;
  overflow: auto;
}
.tutorial-content-wrap{
  width: 100%;
  display: flex;
  height: 100%;
}
</style>
