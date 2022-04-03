<template>
  <v-app>
    <v-main id="main">
      <v-container fluid class="fill-height">
        <v-row class="align-center justify-center" style="height: 100%">
          <v-col cols="6" style="height: 100%" class="pl-6">
            <div class="pb-3" style="height: 40%">
              <v-card class="elevation-6" style="height: 100%">
                <v-container fluid class="fill-height py-0">
                  <v-row class="align-center justify-center" style="height: 100%">
                    <v-col class="pa-0" cols="4" style="height: 100%">
                      <v-list dark class="rounded-l pa-0 primary" style="height: 100%">
                        <v-list-item-group mandatory active-class="indicator" v-model="selectedMode" style="height: 100%">
                          <v-list-item
                              v-for="(item, i) in modes"
                              :key="i"
                              style="height: 25%"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="text-center">
                                {{ item }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                    <v-col cols="8" style="height: 100%; display: flex" class="justify-center">
                      <v-card-title v-if="noAvailableOptions" class="justify-center text--secondary">
                        无可用选项
                      </v-card-title>
                      <v-col v-if="!noAvailableOptions" style="height: 100%" class="mode-options py-0 px-2">
                        <v-text-field label="首字母限制"
                                      v-model="head"
                                      :rules="[rules.singleLetter]"/>
                        <v-text-field label="尾字母限制" class="my-3"
                                      v-model="tail"
                                      :rules="[rules.singleLetter]"/>
                        <v-checkbox label="允许单词环" class="mt-6" v-model="allowRing"></v-checkbox>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
            <div class="pt-3" style="height: 60%">
              <v-card class="elevation-6" style="height: 100%; display: flex; flex-direction: column">
                <v-toolbar class="elevation-0 py-1" style="flex-grow: 0">
                  <v-btn dark class="primary" @click="importText"> 导入文本文件 <v-icon right light> mdi-file-import </v-icon> </v-btn>
                  <v-spacer/>
                  <v-btn dark class="primary" @click="clearInputText"> 清空 <v-icon right light> mdi-cached </v-icon> </v-btn>
                  <v-spacer/>
                  <v-btn dark class="primary"
                         @click="solve"
                         :loading="calculating"
                         :disabled="calculating">
                    求解
                    <v-icon right light> mdi-send </v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text style="flex-grow: 1" class="pt-3">
                  <v-textarea filled no-resize height="86%" placeholder="在此处输入单词文本" style="height: 100%" v-model="inputText"/>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="6" style="height: 100%" class="pr-6">
            <v-card class="elevation-6" style="height: 100%; display: flex; flex-direction: column">
              <v-toolbar class="elevation-0 py-1" style="flex-grow: 0">
                <v-btn dark class="primary" @click="exportText"> 导出文本文件 <v-icon right light> mdi-file-export </v-icon> </v-btn>
                <v-spacer/>
                <v-btn dark class="primary" @click="clearOutputText"> 清空 <v-icon right light> mdi-cached </v-icon> </v-btn>
              </v-toolbar>
              <v-card-text style="flex-grow: 1" class="pt-3">
                <v-textarea filled no-resize height="93%" placeholder="求解结果" style="height: 100%" readonly v-model="outputText"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    modes: ['单词链数量', '单词数最多', '首字母不同', '字母数最多'],
    selectedMode: 1,
    head: '',
    tail: '',
    allowRing: false,
    inputText: '',
    outputText: '',
    calculating: false,
    rules: {
      singleLetter: v => !v || /^[a-zA-Z]$/.test(v) || '只能指定单个英文字母',
    }
  }),
  computed: {
    noAvailableOptions: function () {
      return this.selectedMode === 0 || this.selectedMode === 2
    }
  },
  methods: {
    reportError(msg) {
      alert(msg)
    },
    clearInputText() {
      this.inputText = ''
    },
    clearOutputText() {
      this.outputText = ''
    },
    importText() {
      const { dialog } = require('@electron/remote')
      const fs = require('fs')
      const path = require('path')
      dialog.showOpenDialog({
        title: '选择导入文件',
        buttonLabel: '导入',
        filters: [{ name: '文本文件', extensions: ['txt'] }],
        properties: [
          'openFile',
          'showHiddenFiles'
        ]
      }).then(e => {
        if (e.canceled === false) {
          fs.readFile(
              path.resolve(e.filePaths[0]),
              'utf-8',
              (err, data) => {
                if (err) this.reportError(err.message);
                this.inputText = data.toString();
              }
          )
        }
      })
    },
    exportText() {
      const { dialog } = require('@electron/remote')
      const fs = require('fs')
      const path = require('path')
      dialog.showOpenDialog({
        title: '指定导出文件',
        buttonLabel: '保存',
        filters: [{ name: '文本文件', extensions: ['txt'] }],
        properties: [
          'openFile',
          'showHiddenFiles',
          'promptToCreate'
        ]
      }).then(e => {
        if (e.canceled === false) {
          fs.writeFile(
              path.resolve(e.filePaths[0]),
              this.outputText,
              'utf-8',
              (err) => {
                if (err) this.reportError(err.message)
              }
          )
        }
      })
    },
    solve() {
      this.calculating = true;
      (async function (vm) {
        const _ = require('lodash');
        vm.outputText = _.shuffle(vm.inputText.split('')).join('');
      }) (this).then(() => this.calculating = false)
    },
  }
};
</script>

<style lang="css">
.v-textarea > * {
  height: 100% !important;
}
/*textarea {
  -ms-overflow-style: none;
}
textarea::-webkit-scrollbar {
  display: none;
}*/
.mode-options {
  display: grid !important;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  margin: 0 !important;
}
html {
  overflow: hidden !important;
}
#main:before {
  content: "";
  background: url('assets/background.jpg') no-repeat center center fixed !important;
  background-size: cover !important;
  opacity: 0.3;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
