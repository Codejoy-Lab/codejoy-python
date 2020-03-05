<template>
  <el-container class="body">
    <el-header class="header" height="50px"><Header/></el-header>
    <el-container class="main-parts">
      <el-aside class="asaid-wrap" :width="asideWidth">
        <div class="tutorial-header-wrap">
          <el-button class="fold-icon-button" :icon="icon" circle @click="fold"></el-button>
        </div>
        <div :class="asaid">
          <PythonTutorial/>
          <div class="change-bar" @mousedown="move"></div>
        </div>
      </el-aside>
      <el-main class="main">
        <PythonEditor :Date='vueDate'/>
      </el-main>
    </el-container>
    <el-footer class="footer" height="32px"><Footer/></el-footer>
  </el-container>
</template>

<script>
import PythonTutorial from './components/PythonTutorial'
import PythonEditor from './components/PythonEditor'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'Python',
  components: {
    PythonTutorial,
    PythonEditor,
    Header,
    Footer
  },
  data () {
    return {
      asideWidth: '35%',
      icon: 'el-icon-s-fold',
      asaid: 'asaid',
      folded: false,
      username: '',
      python: '',
      vueDate: []
    }
  },
  methods: {
    move (e) {
      // console.log("move",event)
      let odiv = e.target // 获取目标元素
      let disX = e.clientX - odiv.offsetLeft
      document.onmousemove = (e) => {
        let left = e.clientX - disX
        var percentage = e.clientX / e.view.innerWidth * 100
        this.asideWidth = percentage.toString() + '%'

        // 移动当前元素
        odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px';
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    fold () {
      // console.log("clicked")
      if (!this.folded) {
        this.asideWidth = 'fit-content'
        this.asaid = 'folded'
        this.folded = true
        this.icon = 'el-icon-s-unfold'
      } else {
        this.folded = false
        this.asideWidth = '35%'
        this.asaid = 'asaid'
        this.icon = 'el-icon-s-fold'
      }
    }}
}
</script>

<style scoped>
.body{
  background: #17355F;
  height:100%;
  padding:0;
}
.footer{
  padding: 0;
  background:#1EAFF9;
  display: flex;
  align-content: center;
}
.header{
  background: #1EAFF9;
}
.main{
  margin: 5px;
  background: white;
  border-radius: 5px;
}
.asaid{
  display:flex;
  height: 100%;
}
.asaid-wrap{
  background: white;
  margin: 5px 0 5px 5px;
  border-radius: 5px;

}
.main-parts{
  height: 100%;
  overflow :auto;
}
.change-bar{
  height: 100%;
  width: 3px;
  background: #bbbaba;
}
.change-bar:hover{
  background: #dfdede;
}
.fold-icon-button{
  background: transparent;
  border-style: none;
  margin-left: 5px;
}
.tutorial-header-wrap{
  height: fit-content;
  background: #bbbaba;
}
.folded{
  visibility: hidden;
  width: 0;
}
</style>
