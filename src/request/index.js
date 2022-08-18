// 二次封装axios 拦截器
import axios from "axios";

class HttpRequst {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }
  //初始化请求配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      header: {},
    };
    return config;
  }
  //拦截器部署
  interceptors(instance) {
    //请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        // console.log("拦截处理请求");
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    //响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // console.log("处理响应");
        // 对响应数据做点什么
        return response.data;
      },
      function (error) {
        console.log(error);
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instanse = axios.create();
    options = { ...this.getInsideConfig(), ...options };
    this.interceptors(instanse);
    return instanse(options);
  }
}

export default new HttpRequst();
