import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken, removeToken } from "@/utils/token"
import { Modal, message, notification } from 'ant-design-vue'
import router from '@/router';


/**
 * post请求封装
 * @param params
 */
export function Post(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: 'post',
    url: params.url,
    data: params.data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

/**
 * delete请求封装
 * @param params
 */
export function Delete(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: 'delete',
    url: params.url,
    data: params.data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

/**
 * get请求封装
 * @param params
 */
export function Get(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: 'get',
    url: params.url,
    params: params.data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}

/**
 * patch请求封装
 * @param params
 */
export function Patch(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: 'patch',
    url: params.url,
    data: params.data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err.data)
  })
}


/**
 * 请求拦截
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.common['Authorization'] = getToken() // 请求头带上token
  config.headers.common['token'] = getToken()
  config.baseURL = "/dbd-authority"
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.status == 201 || response.status == 200) {
    let msg: string = response.data.msg
    if (response.data.code == 401) {
      Modal.warning({
        title: 'token出错',
        content: "token失效，请重新登录！",
        onOk: () => {
          // let url: string = `${window.config.loginUrl}?token =${getToken()}`
          // window.location.href = url
          removeToken()
          router.push('/login')
        }
      })
    } else if (response.data.code == 200) {
      if (response.data.status == false) {
        message.warning(msg)
      } else {
        return Promise.resolve(response);
      }
    }
    notification.error({
      message: 'Error',
      description: msg
    })
    return Promise.reject(response);
  }
  return response
}, (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 500:
        notification.error({
          message: 'Forbidden',
          description: error.response.data
        })
        break;
      case 401:
        notification.error({
          message: 'Forbidden',
          description: "暂无权限"
        })
        break;
      case 403:
        notification.error({
          message: 'Forbidden',
          description: "登录过期，请重新登录"
        })
        break;
      // 404请求不存在
      case 404:
        notification.error({
          message: 'Forbidden',
          description: "网络请求不存在"
        });
        break;
      default:
        notification.error({
          message: 'Forbidden',
          description: error.response.data.msg
        });
    }
  }
  return Promise.reject(error.response);
})