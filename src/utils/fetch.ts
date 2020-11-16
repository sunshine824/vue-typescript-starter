import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, removeToken } from "@/utils/token";
import { Modal, message, notification } from "ant-design-vue";
import router from "@/router";

/**
 * post请求封装
 * @param params
 */
export function Post(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: "post",
    url: params.url,
    data: params.data
  })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err.data);
    });
}

/**
 * delete请求封装
 * @param params
 */
export function Delete(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: "delete",
    url: params.url,
    data: params.data
  })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err.data);
    });
}

/**
 * get请求封装
 * @param params
 */
export function Get(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: "get",
    url: params.url,
    params: params.data
  })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err.data);
    });
}

/**
 * patch请求封装
 * @param params
 */
export function Patch(params: StoreState.FetchParams) {
  return axios({
    ...params,
    method: "patch",
    url: params.url,
    data: params.data
  })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err.data);
    });
}

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.common["Authorization"] = getToken(); // 请求头带上token
    config.headers.common["token"] = getToken();
    config.baseURL = "/api";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 201 || response.status == 200) {
      let { code, status, msg, data } = response.data;
      if (code == 401) {
        Modal.warning({
          title: "token出错",
          content: "token失效，请重新登录！",
          onOk: () => {
            removeToken();
            router.push("/login");
          }
        });
      } else if (code == 200) {
        if (status) {
          //接口请求成功
          msg && message.success(msg); //后台如果返回了msg，则将msg提示出来
          return Promise.resolve(response); //返回成功数据
        } else {
          //接口异常
          msg && message.warning(msg); //后台如果返回了msg，则将msg提示出来
          return Promise.reject(response); //返回异常数据
        }
      } else {
        //接口异常
        msg && message.error(msg);
        return Promise.reject(response);
      }
    }
    return response;
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 500:
          notification.error({
            message: "Forbidden",
            description: error.response.data
          });
          break;
        case 401:
          notification.error({
            message: "Forbidden",
            description: "暂无权限"
          });
          break;
        case 403:
          notification.error({
            message: "Forbidden",
            description: "登录过期，请重新登录"
          });
          break;
        // 404请求不存在
        case 404:
          notification.error({
            message: "Forbidden",
            description: "网络请求不存在"
          });
          break;
        default:
          notification.error({
            message: "Forbidden",
            description: error.response.data.msg
          });
      }
    }
    return Promise.reject(error.response);
  }
);
