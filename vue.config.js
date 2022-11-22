const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{    
      proxy:{ //配置代理
        "/api":{
          target:"http://www.openmi.com/index.php/",  //跨域目标主机，最终请求地址变成 http://localhost:8080/push
          ws:true,  //代理websockets
          changeOrigin:true,
          pathRewrite:{
            "/api":''//重写地址
          }
        }
      }
    }
})
