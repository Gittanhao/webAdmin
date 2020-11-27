import axios from 'axios'
import qs from 'qs'
import { router } from '../router'
/*import { Notice } from 'iview'

Notice.config({
  duration: 3
});*/
window.g = {
    //rest请求地址
    domainDevUrl: 'http://172.16.8.18:80',//开发
    domainTestProdUrl: 'http://123.56.118.225:7000/fpservice',//测试
    domainProdUrl: 'https://flow.10010.com:9443/fpservice',//正式
    domainMockDevUrl: 'http://39.107.52.108:8001/app/mock/20',//本地mock
    domainMockProdUrl: 'http://39.107.52.108:8001/app/mock/20',//打包mock
    path: '/',
    redirectTestUrl:'http://123.56.118.225:7000/',
    redirectProdUrl:'https://flow.10010.com:9443/'//重定向地址
}
//mock地址
const mockUrl = window.g.domainMockDevUrl;
let domain = '';

if(process.env.NODE_ENV === "development"){
  //本地开发可以随意修改
  // domain = window.g.domainDevUrl;
  domain = 'http://172.16.8.18:80';
}else if(process.env.NODE_ENV === "mock"){
  domain = window.g.domainMockProdUrl;
}else if(process.env.NODE_ENV === "testing"){
  domain = window.g.domainTestProdUrl;
}else{
  domain = window.g.domainProdUrl;
}

// const serverUrl = domain + window.g.path;
const serverUrl = 'http://172.16.8.18:80';
//axios默认参数配置
axios.defaults.timeout = 1000 * 50;
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  if(config.method === "post") {
    config.data = JSON.stringify(config.data);
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
//添加一个响应拦截器
// axios.interceptors.response.use(function (res) {
//   let data = res.data;
//   return new Promise((resolve) => {
//     if (data.code === '0') {
//       resolve(data.data);
//     }else{
//     /*  Notice.error({
//         title:'系统提示',
//         desc:data.message ? data.message :'网络繁忙！'
//       });*/
//       resolve();
//     }
//   }).catch(error => {
//     console.log(error);
//   });
// }, function (error) {
//
//   const res = error.response;
//   console.log(error);
//   /*if(res.status){
//     if(res.status === 401){//token失效状态码
//       window.parent.postMessage('refresh','*');
//     }else if(res.status === 403){
//       router.push({
//         name: '403'
//       });
//     }else if(res.status === 404){
//       router.push({
//         name: '404'
//       });
//     }else if(res.status === 500){
//       router.push({
//         name: '500'
//       });
//     }
//   } else {
//     return Promise.reject(error);
//   }*/
// });

export default  function request(url,option) {
  let httpUrl;
  if(!option.noPrefix){
    httpUrl= option.mock ? mockUrl + url : serverUrl + url;
  }else{
    httpUrl= option.mock ? mockUrl + url : url;
  }
  let reqUrl = '';
  if(option.body.method === 'GET' && option.body.data){
    reqUrl = httpUrl + '?' + qs.stringify(option.body.data);
  }else{
    reqUrl = httpUrl;
  }
  const defaultOptions = {
    method:'POST',
    url:reqUrl
  };
  const newOptions = { ...defaultOptions, ...option.body };
  if(option.type&&option.type=="download"){
    window.open(reqUrl);//note 目前没发现那个地方能直接打开链接
  }else{
    return axios({
      ...newOptions
    }).then(res => {

      return res
    })
  }

}
