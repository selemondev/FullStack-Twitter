import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import { useAuthStore } from '../stores/authStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/edit-profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("../views/Edit.vue"),
      meta: {
        auth: true
      }
    },
  ]
});

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/")
    }
  } else {
    next();
  }
})

export default router
