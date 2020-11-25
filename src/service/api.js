import request from '../libs/request'

//通用请求方法，一般用于组件使用

//查询
export async function queryApi(url,params,mock,method) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params,
      method:method ? method : 'POST'
    }
  });
}
//新增
export async function addApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}
//删除
export async function removeApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}
//更新
export async function updateApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}

//自定义请求接口
export async function menu(params) {
  return request('/menu',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function menu2(params) {
  return request('menu2',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function appMenu(params) {
  return request('portal/auth/getUserMenus',{
    body:{
      data:params
    }
  });
}

export async function user(params) {
  return request('user',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function queryTest(params) {
  return request('list2',{
    mock:true,
    body:{
      method:'GET',
      data:params
    }
  });
}
export async function queryPerms(params) {
  return request('havePerms',{
    body:{
      method:'GET',
      data:params
    }
  });
}
//获取所有岗位列表
export async function selectAllStaions(params,mock) {
  return request('uAuth/selectAllStaions',{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}

//获取登录人岗位信息
export async function selectUserStaions(params,mock) {
  return request('uAuth/selectUserStaions',{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}
