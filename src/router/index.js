import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'
// import Hot from '../views/Hot.vue'
import Search from '../views/Search.vue'
import PlayListNext from '../views/PlayListNext.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Recommend',
        component: Recommend,
        meta: {
            isShowNav: true,
            gender: "Recommend"
        },
    },
    {
        path: '/hot',
        name: 'Hot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Hot.vue'),
        meta: {
            isShowNav: true,
            gender: "Hot"
        },
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            isShowNav: true,
            gender: "Search"
        },
    },
    {
        path: '/playlistnext',
        name: 'PlayListNext',
        component: PlayListNext,
        meta: {
            // isShowNav: true,
            gender: "PlayListNext",
            isShowNav: false
        },
    }
]

const router = new VueRouter({
    routes
})

export default router