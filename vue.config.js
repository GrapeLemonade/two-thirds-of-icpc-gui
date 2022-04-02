const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: ".",
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
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
