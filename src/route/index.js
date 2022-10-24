import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', redirect: '/index' },
        // {path:'/login',name:'login',component:()=> import('@/view/login/index.vue')}
    ]
})

export default router;