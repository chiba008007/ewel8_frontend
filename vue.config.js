const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  assetsDir: "",
  devServer: {
    historyApiFallback: true, // 画面リロードしてエラーにならないように
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  chainWebpack: (config) => {
    config.plugin("fork-ts-checker").tap((args) => {
      args[0].typescript = {
        ...args[0].typescript,
        diagnosticOptions: {
          semantic: false,
          syntactic: false,
        },
      };
      return args;
    });
  },
});
