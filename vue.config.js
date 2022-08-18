const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    // proxy: {
    //   "/api": {
    //     //前缀,是否走代理,将请求url中/api替换为下面target
    //     target: "http://localhost:8000",
    //     pathRewrite: { "^/api": "" }, //重置路径正则表达式:替换url中/api
    //     ws: true, //支持websocket
    //     changeOrigin: true, //用于控制请求头host值
    //   },
    // },
  },
  //首屏请求优化
  chainWebpack(config){
    config.plugins.delete("preload"); // 删除默认的preload
    config.plugins.delete("prefetch"); // 删除默认的prefetch
  },
});
