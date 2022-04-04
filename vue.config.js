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
      'moment': 'commonjs moment',
      'ffi-napi': 'commonjs ffi-napi',
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['ffi-napi', 'moment'],
      builderOptions: {
        "win": {
          "target": [
              "nsis",
              "portable"
          ]
        },
        extraFiles: [
          {
            from: './core.dll',
            to: 'core.dll'
          }
        ]
      }
    }
  }
})
