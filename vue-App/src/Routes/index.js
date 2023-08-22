import { createWebHistory,createRouter } from "vue-router"
import Login from "@/components/Login.vue";

import FrontPage from "@/components/FrontPage.vue";
import MyTasks from "@/components/MyTasks.vue";
import SignUp from "@/components/SignUp.vue";

import Analytics from "@/components/TaskAnalytics.vue";
import Dashboard from "@/components/Dashboard.vue"

const routes=[
    {path:'/',name:'FrontPage',component:FrontPage},
    {path:'/login',name:'Login',component:Login,

    },
    {path:'/sign-up',name:'SignUp',component:SignUp},
    {path:'/my-tasks',
    name:'MyTasks',
    component:MyTasks,
    meta:{
        requiresAuth:true,
    },
    },
   
    {path:'/analytics',name:'Analytics',component:Analytics,
    meta:{
        requiresAuth:true,
    },
    },
    {path:'/dashboard',name:'Dashboard',component:Dashboard,
    meta:{
        requiresAuth:true,
    },
    },
    
]


const router=createRouter({
    history:createWebHistory(),
    routes,

});
router.beforeEach((to, from, next) => {
   
  const authToken = JSON.parse(localStorage.getItem('loggedInUser'));
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log('before entering');
      console.log('authToken',authToken);

      if (!authToken) {
        // Redirect to the login page or another appropriate route
        console.log('redirecting to login page');
        next('/login');
      } else {
        console.log('User is authenticated');
        next();
      }
    } else {
        console.log('Route doesnt require');
        if(authToken && ["Login", "SignUp"].includes(to.name)){
          next('/dashboard');
        }
        next(); // Route doesn't require authentication, proceed with navigation
    }
  });
export default router;