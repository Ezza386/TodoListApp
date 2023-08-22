import { createWebHistory,createRouter } from "vue-router"
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import FrontPage from "@/components/FrontPage.vue";
import MyTasks from "@/components/MyTasks.vue";
import SignUp from "@/components/SignUp.vue";

import Analytics from "@/components/TaskAnalytics.vue";
import Dashboard from "@/components/Dashboard.vue"

const routes=[
    {path:'/',name:'FrontPage',component:FrontPage},
    {path:'/Login',name:'Login',component:Login,

    },
    {path:'/SignUp',name:'SignUp',component:SignUp},
    {path:'/MyTasks',
    name:'MyTasks',
    component:MyTasks,
    meta:{
        requiresAuth:true,
    },
    },
   
    {path:'/Analytics',name:'Analytics',component:Analytics,
    meta:{
        requiresAuth:true,
    },
    },
    {path:'/Dashboard',name:'Dashboard',component:Dashboard,
    meta:{
        requiresAuth:true,
    },
    },
    {path:'/Home',name:'Home',component:Home}
]


const router=createRouter({
    history:createWebHistory(),
    routes,

});
router.beforeEach((to, from, next) => {
   
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log('before entering');
      const authToken = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log('authToken',authToken);
      if (!authToken) {
        // Redirect to the login page or another appropriate route
        console.log('redirecting to login page');
        next('/');
      } else {
        console.log('User is authenticated');
        next(); // User is authenticated, proceed with navigation
      }
    } else {
        console.log('Route doesnt require');
      next(); // Route doesn't require authentication, proceed with navigation
    }
  });
export default router;