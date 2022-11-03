import axios from 'axios';
import { ElMessage,ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter();

const service = axios.create({
    baseURL: '/api',
    timeout: 50000
})

service.interceptors.request.use(
    //请求正常的回调函数
    (config) => {
        //将请求头携带上token后 发送到后端
        config.headers.Authorization = localStorage.getItem('token');
        //一定要返回config配置对象 不然无法正常进行请求
        return config;
    },
    //请求错误的回调函数
    (error) => {
        return Promise.reject(error);
    }
)

//定义响应拦截器 在里面捕获错误 和过滤数据
let msg;
service.interceptors.response.use(
    //响应成功的回调函数
    (response) => {
        //结构数据
        const { code, message } = response.data;
        //判断token是否过期 放400过去 到页面去处理
        if (code == 400) {
            return response.data;
        }
        //判断后端放回的code 是否正常
        if (code == 0) {
            //请求成功 一定要返回过滤数据 不返回后面就拿不到数据了
            return response.data
        } else {
            //判断是否有弹窗 有则关闭
            if (msg) {
                msg.close();
            }
            //弹出错误信息 信息是从后端请求过来的错误的message
            msg = ElMessage({ type: 'error', message });
            //抛出错误
            return Promise.reject(new Error(message));
        }
    },
    //处理错误的回调函数 当axios请求发生错误 这里来捕获 代表axios请求失败的错误
    (error) => {
        if (msg) {
            msg.close();
        }
        if (error.response) {
            msg = ElMessage({ type: 'error', message: "请求出错,联系管理员咯！" });
        }
        return Promise.reject(new Error(error.response.data.message));
    }
)

export default service;