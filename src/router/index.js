import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Start',
        meta: {layout: 'empty'},
        component: () => import('../views/Start')
    },
    {
        path: '/posts',
        name: 'Home',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Home')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {layout: 'empty'},
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {layout: 'empty'},
        component: () => import('../views/Register')
    },
    {
        path: '/add',
        name: 'AddPost',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/AddPost')
    },
    {
        path: '/post/:id',
        name: 'Post',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Post')
    },
    {
        path: '/post/edit/:id',
        name: 'Edit',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/EditPost')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)

    if (requireAuth && !currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router
