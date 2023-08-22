<template>
  <div class="page-container">
  <el-row class="tac">
   <el-col>
      <div class="nav-container">  
          <div class="top-navbar">
      <el-icon style="width:100px" class="toggle-button" @click="toggleNavbar" :class="{ 'button-closed': !isNavbarOpen }"><Expand /></el-icon>
      <div class="fix"><img src="logo-back.png" class="logo-back"></div> 
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
        <div class="user-info">
          <img
            src="ezza.jpg"
            alt="User Image"
            class="user-image"
          />
          
        </div>
        <span class="user-name">  {{ loggedInUserFirstName }}</span>
        <el-menu-item index="1">

          <router-link to="/">
            <el-icon  class="menu-item-text"><House /></el-icon>
            <span  class="menu-item-text">Home</span>
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
   
  <div class="content-container">

  
    <div class="dashboard-container">
      <h2 class="dashboard">Dashboard</h2>
      <div class="task-list">
        <div class="task" v-for="(task, index) in tasks" :key="index">
            <div class="task-header" >
           <span class="title-style">Project Title:</span>
          </div>
          <div class="task-header" >
            <span class="task-title"> {{ task.task }}</span>
            <span
              class="task-status"
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

.content-container {
  flex: 1;


}
  .dashboard-container {
  margin-top: 100px;
  position: relative;
  right: 1180px;
  width: 900px;
bottom: 30px;

  }
  .change-logout{
    background-color:#1C0233 ;
    border: none;
    margin-bottom: 10px;
    margin-right: 18px;
    font-size: 14px;
    color: white;
    pointer-events: none;
  }
  .task-list {
    display: grid;
    gap: 15px;
    max-height: calc(100vh - 100px);
  overflow-y: auto;
  }
  .dashboard{
    color: #ccc;
    margin-bottom: 20px;
  }
  .task {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 800px;
    height: 120px;
  }
  .title-style{
    font-size: 12px;
    
    color: #777;
  }
  .task-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
  }
  
  .task-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  
  .task-status {
    font-size: 14px;
    color: #fff;
   border-radius: 100%;
    padding: 6px 12px;
    margin-bottom: 40px;
  }
  
.nav-container{
      display: flex;
height: 100vh;

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
.menu-item-text {
color: #fff; 

}
.user-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 10px;
}
.el-menu-item a,
.el-menu-item-group__title a,
.el-submenu__title a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s; 
  background-color: transparent;
}

.el-menu-item a:hover,
.el-menu-item-group__title a:hover,
.el-submenu__title a:hover {
  color: #ffd04b;
  background-color: transparent;
}
.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
 margin-left: 20px;
}

.user-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-left: 60px;
}
.toggle-button {
  border: none;
  background-color: #efecf2; 
  cursor: pointer;
  margin-right: 850px;
}
.button-closed{
  position: absolute;
  right: 500px;
  width: 200px;
  height: 60px;
}
.top-navbar {
  display: flex;
  align-items: center;
  justify-content:flex-end;
  background-color: #efecf2; 
  height: 60px; 
  width: 1400px;
  margin-bottom: 130px;
}
.logo-back{
  width: 150px;
  height: 30px;

 
}
.fix{
  background-color: #efecf2; 
  margin-right: 180px;
}
  </style>