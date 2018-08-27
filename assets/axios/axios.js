import Address from '../../location';
import {loadStart, loadEnd} from '../util/util';
import axios from 'axios';
import qs from 'qs';

// 默认配置
const Axios = axios.create({
    baseURL: Address.path + Address.ajaxPath,
    timeout: 2500,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

//http request 拦截器
Axios.interceptors.request.use(
    config => {
        loadStart();
        config.data = qs.stringify(config.data);
        return config;
    },
    error => {
        loadEnd();
        return Promise.reject(error);
    }
);

//http response 拦截器
Axios.interceptors.response.use(
    response => {
        // 登录检测
        if (response.data.code === 201) {
            location.href = '/user/login';
        }
        loadEnd();
        return response;
    },
    error => {
        loadEnd();
        return Promise.reject(error);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetchGet(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetchPost(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data.data, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}

export default {fetchGet, fetchPost};