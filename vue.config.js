const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: ".",
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    externals: {
      fs: 'require("fs")',
      path: 'require("path")'
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "win": {
          "target": [
              "nsis",
              "portable"
          ]
        }
      }
    }
  }
})
