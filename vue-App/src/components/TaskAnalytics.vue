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

     <!--             <router-link to="/">
            <el-menu-item index="4">
              <div @click="Logout">
            <el-icon><Back /></el-icon>
            <el-button class="change-logout">Logout</el-button>
          </div>
</el-menu-item>
          </router-link>-->
        </el-menu>
      </div>
      </el-col>
    </el-row>

  </div>
 
  <div class="  ml-[430px]  ml-auto mt-36 justify-center absolute pb-12 h-96 w-96">
    <h3 class="justify-center pl-36 color-#1C0233">Analysis</h3>
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
