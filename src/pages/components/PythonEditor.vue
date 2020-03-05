<template>
  <div class="sk-view">
    <el-row class="editor-wrap">
          <el-col :span="24">
            <form>
              <el-row>
                <el-col>
                  <el-tabs type="card" >
                    <el-tab-pane
                      label="main.py"
                    >
                      <codemirror ref="myCm"
                        id="yourCode"
                        v-model="codes"
                        :options="cmOption"
                        cols="80"
                        rows="5"
                        @input="onCmCodeChange"
                    ></codemirror>
                    </el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                    <el-row>
                      <el-col :span="3" :offset="17">
                        <el-button type="success" @click="runIt" icon="el-icon-caret-right">Run</el-button>
                      </el-col>
                      <el-col :span="3" :offset="0">
                        <el-button type="success" @click="dialogFormVisible = true" icon="el-icon-folder">save</el-button>
                      </el-col>
                    </el-row>
                </el-col>
              </el-row>

            </form>
            <div>
              <el-dialog title="input your project name" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="project name" :label-width="formLabelWidth">
                    <el-input v-if="operate === 'save'" v-model="form.name" autocomplete="off"></el-input>
                    <el-input v-if="operate === 'updata'" :disabled="true" v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">cancel</el-button>
                  <el-button type="primary" @click="save">save</el-button>
                </div>
              </el-dialog>
            </div>
          </el-col>
    </el-row>
    <el-row class="result-row">
      <el-col :span="24">
        <el-tabs class="result-el-tabs">
            <el-tab-pane class="console-el-tab-pane" label="Console">
              <div class="result-wrap">
                <el-input
                type="textarea"
                :rows="16"
                placeholder="result"
                v-model="outPrint">
              </el-input></div>
            </el-tab-pane>
            <el-tab-pane label="Canvas">
              <div class="result-wrap" style="height: 330px ;overflow: auto" ><div class='canvas' id="myCanvas" style="height:700px"></div></div>
            </el-tab-pane>
        </el-tabs>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Sk from '@hwc/skulpt'
import 'codemirror/mode/python/python.js'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neo.css'
import 'codemirror/keymap/emacs.js'

export default {
  name: 'PythonEditor',
  data () {
    return {
      codes: '',
      outPrint: '',
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      username: '',
      state: '',
      filename: '',
      operate: '',
      date: 0,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        mode: 'python',
        theme: 'neo',
        keyMap: 'emacs',
        spellcheck: true,
        autocorrect: true
      }
    }
  },
  methods: {
    runIt () {
      this.outPrint = ''
      Sk.configure({
        output: (text) => { this.outPrint += text },
        read: (x) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
            throw new Error('File not found: \'' + x + '\'')
          }
          return Sk.builtinFiles['files'][x]
        },
        '__future__': Sk.python3
      });

      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = document.getElementById('myCanvas')

      Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody('<stdin>', false, this.codes, true)
      }).then(() => {
        this.loaded = true
      }, () => {
        this.loaded = true
      })
      console.log(this.codes)
    },

    save () {
      this.date = new Date().getTime()
      let data = {username: this.username, filename: this.form.name, file: this.codes, date: this.date}
      if (this.state === 'Y') {
        axios.put(process.env.API_HOST + `/python/updateFile/:id`, data)
          .then(res => {
            console.log('res=>', res)
            this.dialogFormVisible = false
          }).catch(err => this.$notify({
            type: 'error',
            message: err
          }))
      } else {
        axios.post(process.env.API_HOST + `/python/uploadFile/:id`, data)
          .then(res => {
            console.log('res=>', res)
            this.dialogFormVisible = false
          }).catch(err => this.$notify({
            type: 'error',
            message: err
          }))
      }
      this.dialogFormVisible = false
    },
    onCmCodeChange (newCode) {
      this.codes = newCode
    },
    handleMessage (event) {
      const cmd = event.data.cmd
      if (cmd === 'success') {
        this.codes = event.data.file
        this.username = event.data.username
        this.state = event.data.state
        this.filename = event.data.filename
        console.log('filename', this.filename)
        if (this.filename !== undefined) {
          this.operate = 'updata'
          this.form.name = this.filename
        } else {
          this.operate = 'save'
        }
        console.log('data', event.data)
      }
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
  // handleTabsEdit (targetName, action) {
  //   if (action === 'add') {
  //     let newTabName = ++this.tabIndex + ''
  //     this.editableTabs.push({
  //       title: 'New Tab',
  //       name: newTabName,
  //       content: 'aaa'
  //     })
  //     this.editableTabsValue = newTabName
  //   }
  //   if (action === 'remove') {
  //     let tabs = this.editableTabs
  //     let activeName = this.editableTabsValue
  //     if (activeName === targetName) {
  //       tabs.forEach((tab, index) => {
  //         if (tab.name === targetName) {
  //           let nextTab = tabs[index + 1] || tabs[index - 1]
  //           if (nextTab) {
  //             activeName = nextTab.name
  //           }
  //         }
  //       })
  //     }
  //
  //     this.editableTabsValue = activeName
  //     this.editableTabs = tabs.filter(tab => tab.name !== targetName)
  //   }
  // }
}

</script>

<style scoped>
.editor-wrap{
  background: white;
}
.sk-view{
  height: 100%;
  overflow:hidden;
}

  .result-row{
    height: 50%;
    padding: 10px;
    background: white;
    margin-top: 5px;
    /* height: 50; */
    overflow :auto;
  }
  .result-el-tabs{
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #17355F;
  }
</style>
