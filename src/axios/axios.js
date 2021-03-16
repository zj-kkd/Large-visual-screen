// import axios from 'axios';
// import store from '../store/store';

// const http = axios.create({
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//       }
// })

// // 拦截请求 验证token
// http.interceptors.request.use(
//     config => {
//         // 验证
//         let token = store.state.token;
//         config.headers.token = token;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // response 拦截器
// http.interceptors.response.use(response => {

//     if (response.status <= 400) {
//         return response
//     }

//     return Promise.reject(response)
// }, error => {
//     return Promise.reject(error)
// })

// export default http





//输出通用axios实例
import axios from 'axios';

const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    }
});

export default {
    userLogin(data) {
        return instance.post('/api/user/login', data);
    },
    allUser() {
        return instance.get('/showData/getData/main');
    },
    allProduct() {
        return instance.post('/api/product')
    },
    upload(data) {
        return instance.post('/api/upload', data)
    },
    regist(data) {
        return instance.post('/api/createOrUpdateUser', data)
    }
};