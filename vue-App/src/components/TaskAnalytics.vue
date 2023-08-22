<template> 

<div>
 <el-row class="tac">
   <el-col >
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

     <!--     <el-menu-item index="4">
            <el-icon><Aim /></el-icon>
            <span>My Goals</span>
          </el-menu-item>-->
        </el-menu>
      </div>
      </el-col>
    </el-row>

  </div>
 
  <div class="chart-container" style="width: 400px; height: 400px; margin-top: 120px; justify-content:center;position: absolute;">
    <h3 class='heading-fix'>Analysis</h3>
    <canvas id="taskChart"></canvas>
    
 </div>
</template>
<script setup>
import { ref, onMounted} from 'vue';
import { Chart } from 'chart.js/auto';
const tableData = ref([]);
const taskInput = ref('');
let  taskChart;
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const loggedInUserFirstName = ref(loggedInUser ? loggedInUser.fname : '');
const isNavbarOpen = ref(true); // Initial state: Navbar is open

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
  
  console.log('Navbar is open:', isNavbarOpen.value); 
};
onMounted(() => {
  
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tableData.value = JSON.parse(savedTasks);
    createChart();
  }
});
const addTask = () => {
  if (taskInput.value.trim() !== '') {
    tableData.value.push({ task: taskInput.value, status: 'pending' });
    taskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tableData.value));
  }
};

const createChart = () => {
  const taskChartCanvas = document.getElementById('taskChart');
  console.log('createChart function called');
  if (taskChartCanvas) {
      taskChart = new Chart(taskChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Ongoing','Completed'],
        datasets: [
          {
            data: calculateTaskStatuses(), 
            backgroundColor: ['#FF5722','#03A9F4','#8BC34A'],
          },
        ],
      },
     options: {
    responsive: true,
    maintainAspectRatio: false, 
  },
  plugins: {
    title: {
      display: true,
      text: "Chart Title",
    },
  },
    });
    console.log('Chart created');
  }
};

const calculateTaskStatuses = () => {
  
 
  const pending = tableData.value.filter(task => task.status === 'pending').length;
  const ongoing = tableData.value.filter(task => task.status === 'ongoing').length;
  const completed = tableData.value.filter(task => task.status === 'completed').length;
  
  console.log('pending:', pending);
  console.log('ongoing:', ongoing);
  console.log('completed:', completed);
  return [pending, ongoing,completed];
};

</script>
<style scoped>

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
.chart-container{
  padding-bottom: 50px;
  margin-left: 430px;
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
}.menu-item-text {
color: #fff; 
}
h3{
  justify-content: center;
  padding-left: 140px;
  color: #1C0233;
}
</style>
