import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //重定向
        { path: '/', redirect: '/index' },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/login/login.vue')
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/view/index/index.vue'),
            // children: [
            //     { path: 'index', name: 'index', component: () => import('') }
            // ]
        }
    ]
})
//定义不需要token 也可以进入的白名单
const whiteList = ['/login'];
//定义路由前置守卫
router.beforeEach((to, from, next) => {
    //判断localStorage中是否存在token 也就是判断是否登入
    if (localStorage.getItem('token')) {
        //如果有登入 还要去登入页面就 把它跳转到index页面
        if (to.path === '/login') {
            next('/index');
        } else {
            //如果没去login页面 就直接继续
            next();
        }
    } else { //没有token 也就是没有登入
        //判断是否在白名单中 在就让他跳转 不在就跳转到login页面
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login')
        }
    }
})

export default router;