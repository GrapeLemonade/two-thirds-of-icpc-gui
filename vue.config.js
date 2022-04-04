const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: ".",
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    externals: {
      fs: 'require("fs")',
      path: 'require("path")',
      'ffi-napi': 'commonjs ffi-napi',
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['ffi-napi'],
      builderOptions: {
        "win": {
          "target": [
              "nsis",
              // "portable"
          ]
        }
      }
    }
  }
})
