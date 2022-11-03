import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //重定向
        { path: '/', redirect: '/login' },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/login/login.vue')
        },
        {
            path: '/feast_team_admin',
            name: 'feastTeamAdmin',
            component: () => import('@/view/feastTeamAdmin/feastTeamAdmin.vue')
        },
        {
            path: '/notfind',
            name: 'notFind',
            component: () => import('@/view/notFind/notFind.vue')
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/view/index/index.vue'),
            children: [
                {
                    path: 'feast_team_page',
                    name: 'feasTeam',
                    component: () => import('@/view/feastTeamPage/feastTeamPage.vue')
                },
                {
                    path: 'feast_list_page',
                    name: 'feastListPage',
                    component: () => import('@/view/feastListPage/feastListPage.vue')
                },
                {
                    path: 'chat',
                    name: 'chat',
                    component: () => import('@/view/chat/chat.vue')
                },
                {
                    path: 'public_feast_page',
                    name: 'publicFeastPage',
                    component: () => import('@/view/publicFeastPage/publicFeastPage.vue')
                },
                {
                    path: 'personal',
                    name: 'personal',
                    component: () => import('@/view/personal/personal.vue')
                },

            ]
        }
    ]
})
//定义不需要token 也可以进入的白名单
const whiteList = ['/login','/notfind'];
//个人用户才能进的名单
const userList = ['/index/feast_team_page', '/index/public_feast_page', '/personal', '/index/chat'];
//团队用户才能进的名单
const feastTeamList = ['/feast_team_admin', '/index/feast_list_page', '/index/chat'];

//定义路由前置守卫
router.beforeEach((to, from, next) => {
    //判断localStorage中是否存在token 也就是判断是否登入
    if (localStorage.getItem('token')) {
        const userType = JSON.parse(localStorage.getItem('userinfo')).userType;
        //如果有登入 还要去登入页面就 把它跳转到index页面
        if (to.path === '/login') {
            if (userType === '0' ) {
                next('/index/feast_team_page')
            }else{
                next('/index/feast_list_page');
            }
        }else if(whiteList.includes(to.path)){
            next();
        }else {
            //如果没去login页面 判断用户的类型
            if (userType === '0' && userList.includes(to.path)) { //是个人用户且在个人用户的名单内 允许跳转
                next();
            }else if (userType === '1' && feastTeamList.includes(to.path)) {//是团队用户且在团队用户的名单内 允许跳转
                next();
            }else{
                 //不满足条件去404
                 next('/notfind');
            }
               
            
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