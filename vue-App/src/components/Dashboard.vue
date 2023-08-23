<template>
<div>
 <el-row class="tac">
   <el-col >
      <div class=" flex h-screen">  
        <div class=" flex justify-end bg-[#efecf2] h-14 w-screen mb-32">
          <el-icon  class="toggle-button mb-full bg-[#efecf2] cursor-pointer mr-[720px] mt-0.5" @click="toggleNavbar" :class="{ 'button-closed': !isNavbarOpen }"><Expand /></el-icon>
      <div class="mr-44 bg-[#efecf2]"><img src="logo-back.png" class="relative left-36 w-[200px] h-[40px] mt-[10px]  " ></div> 
      </div>
        <el-menu 
        v-show="isNavbarOpen"
          active-text-color="#ffd04b"
          background-color="#1C0233"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
        <div class="flex items-center mr-5 p-2.5">
          <img
            src="ezza.jpg"
            alt="User Image"
            class="w-24 h-24 rounded-full ml-5"
          />
          
        </div>
        <span class="m-16 text-2xl font-semibold text-white">  {{ loggedInUserFirstName }}</span>
        <el-menu-item index="1">

          <router-link to="/">
            <el-icon  class="color-#fff"><House /></el-icon>
            <span  class="color-#fff">Home</span>
          </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/my-tasks">
              <el-icon><CircleCheckFilled /></el-icon>
            <span>Add Todo</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/dashboard">
            <el-icon><Menu /></el-icon>

            <span>Dashboard</span>
          </router-link>
          </el-menu-item>
          <el-menu-item-group title="Reporting">
              <el-menu-item index="3-1" >
            <router-link to="/analytics">
            <el-icon><Histogram /></el-icon>
            <span>Portfolios</span>
          </router-link>
          </el-menu-item>
          </el-menu-item-group>

            <router-link to="/">
            <el-menu-item index="4">
              <div @click="Logout">
            <el-icon><Back /></el-icon>
            <el-button class="change-logout">Logout</el-button>
          </div>
</el-menu-item>
          </router-link>
        </el-menu>
      </div>
      </el-col>
    </el-row>

  </div>
   
  <div class="flex-1">

  
    <div class="  w-900  mt-20 relative right-0 left-[-1000px]">
      <h2 class="text-slate-300 ">Dashboard</h2>
      <div class="grid gap-15 max-h-[calc(100vh-100px)] overflow-y-auto">
        <div class=" border border-gray-300 rounded-md p-10 bg-white shadow-md w-[800px] h-[170px]"  v-for="(task, index) in tasks" :key="index">
            <div class="flex justify-between items-center mt-3" >
           <span class="text-xs text-gray-600">Project Title:</span>
          </div>
          <div class="flex justify-between items-center mt-3" >
            <span class="text-lg font-bold mb-40"> {{ task.task }}</span>
            <span
              class="text-sm text-white bg-gray-800 rounded-full py-2 px-3 mb-40"
              :style="{ backgroundColor: getStatusBackgroundColor(task.status) }"
            >
              {{ task.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
</div>
 
</template>
  
<script setup>
import { ref, onMounted } from 'vue';  
import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
const tasks = ref([]);
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const loggedInUserFirstName = ref(loggedInUser ? loggedInUser.fname : '');
const isNavbarOpen = ref(true);
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
  
  console.log('Navbar is open:', isNavbarOpen.value); 
};
const Logout=()=>{
   const logout= localStorage.removeItem('loggedInUser');
   if(logout){
    router.push('/');
   }
   
  };
  onMounted(() => {
    loadTasksFromLocalStorage();
   // Logout();
  });
  
  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      tasks.value = savedTasks;
    }
  };
  
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'completed':
        return '#8BC34A'; // Green
      case 'pending':
        return '#FF5722'; // Red
      case 'ongoing':
        return '#03A9F4'; // Blue
      default:
        return '#777'; // Default
    }
  };
  </script>
  
  <style scoped>


  .change-logout{
    background-color:#1C0233 ;
    border: none;
    margin-bottom: 10px;
    margin-right: 18px;
    font-size: 14px;
    color: white;
    pointer-events: none;
  }
  
  
  .el-menu-vertical-demo {
flex: 1;
width: 180px;
font-size: 12px;
height: 100%;
position: fixed;
top: 0;
left: 0;
}

.button-closed{
  position: absolute;
  right: 450px;
  width: 200px;
  height: 60px;
  background-color: #efecf2;
}

  </style>