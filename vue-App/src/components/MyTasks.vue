<template>
<div> 
<el-row class="tac">
 <el-col>
    <div class="nav-container">  
      <div class="top-navbar">
       <el-icon style="width:100px" class="toggle-button" @click="toggleNavbar" :class="{ 'button-closed': !isNavbarOpen }"><Expand /></el-icon>
    <div class="fix">
      <img src="logo-back.png" class="logo-back">
    </div> 
    </div>
      <el-menu 
      v-show="isNavbarOpen"
        active-text-color="#ffd04b"
        background-color="#1C0233"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">
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


      </el-menu>
    </div>
    </el-col>
  </el-row>
</div>

    <div class="container" style="max-width: 600px;">
      <h1 class="logo-title">
       
      </h1>
      <div class="input-fix">
        <el-input v-model="taskInput" placeholder="Enter Todo" style="width: 500px; margin-top: 10px; margin-left: 30px;" />
        <el-button @click="addTask" style="margin-left: 10px; margin-top: 10px; background-color: #1C0233; color: white;">Add Todo</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="task" label="Tasks" width="200">
          <template #default="scope">
            <div class="task-cell">
              <span v-if="!scope.row.isEditing" class="task-text">{{ scope.row.task }}</span>
              <el-input
                v-else
                v-model="scope.row.task"
                style="width: 80%"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="130">
          <template #default="scope">
          
            <div :style="getStatusStyle(scope.row.status)" class="status-cell">
             
              <el-button size="mini" @click="toggleStatus(scope.row)" :style="getStatusStyle(scope.row.status)" style="border: none;">
                {{ scope.row.status }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label="Operations">
  <template #default="scope">
    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
      <el-icon><Edit/></el-icon>
    </el-button>
    <el-button size="small" type="success" v-if="scope.row.isEditing" @click="saveEdit(scope.row)">
      Save
    </el-button>
    <el-button size="small" type="info" v-if="scope.row.isEditing" @click="cancelEdit(scope.row)">
      Cancel
    </el-button>
    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
      <el-icon><Delete/></el-icon>
    </el-button>
  </template>
</el-table-column>

      </el-table>
      <div class="chart-container" style="width: 400px; height: 400px;">
    <canvas id="taskChart"></canvas>
      </div>
</div>

</template>
  
<script setup>
import { ref, onMounted ,watch,computed} from 'vue';
import { Chart } from 'chart.js/auto';

  const taskInput = ref('');
  const tableData = ref([]);
  let  taskChart;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const loggedInUserFirstName = ref(loggedInUser ? loggedInUser.fname : '');
const isNavbarOpen = ref(true); 
tableData.value.forEach(row => {
  row.isEditing = false;
});
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
  
  console.log('Navbar is open:', isNavbarOpen.value); 
};
onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
  //console.log('On Mounted',savedTasks);
  if (savedTasks) {
    tableData.value = JSON.parse(savedTasks);
   console.log(savedTasks);
  // createChart();
  }
 
});
  const getStatusStyle = (status) => {
    const style = {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '5px',
      padding: '3px 6px',
      borderRadius: '4px',
      backgroundColor:''
    };
    
    switch (status) {
      case 'completed':
        style.backgroundColor = '#8BC34A'; // Green
        break;
      case 'pending':
        style.backgroundColor = '#FF5722'; // Red
   
        break;
      case 'ongoing':
        style.backgroundColor = '#03A9F4'; // Blue
        break;
      default:
        style.backgroundColor = '#FF5722'; // Red
        break;
    }
    return style;
  };
  
  const handleEdit = (index, row) => {

  if (!row.isEditing) {
    row.isEditing = true;
    row.originalTask = row.task; 
  } else {
    row.isEditing = false;
    row.task = row.originalTask;
  }
};
const saveEdit = (row) => {
  row.isEditing = false;
  localStorage.setItem('tasks', JSON.stringify(tableData.value));
};

const cancelEdit = (row) => {
  row.isEditing = false;
  row.task = row.originalTask;
};

  
  const handleDelete = (index, row) => {
    const shouldDelete=confirm('Are you sure you want to delete this Todo?');
    if(shouldDelete){
      tableData.value.splice(index, 1); 
    localStorage.setItem('tasks', JSON.stringify(tableData.value)); 
    }
    
  };
  
  const addTask = () => {
  console.log('addTask function called');
  if (taskInput.value.trim() !== '') {
    tableData.value.push({ task: taskInput.value, status: 'pending' });
    taskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tableData.value));
  }
};
const getNextStatus = (currentStatus) => {
  const statusMap = {
    pending: 0,
    ongoing: 1,
    completed: 2
    
  };
  const newStatus= ['pending','ongoing','completed'];
  const id=statusMap[currentStatus];
 console.log('status',currentStatus);
  console.log('Id',id);

 if (id === 2) {
    return  newStatus[0]; 
  } else {
    return newStatus[id+1]; 
  }
  //return newStatus[id+1]; 

};

const toggleStatus = (task) => {
  const newStatus = getNextStatus(task.status);
  task.status = newStatus;
  localStorage.setItem('tasks', JSON.stringify(tableData.value));
  console.log('Updated localStorage:', localStorage.getItem('tasks'));

};

</script>
  
<style scoped>
.input-fix{
display: flex;
}
  .container {
  justify-content:center;
  margin-right: 190px;
  margin-left: 100px;
  border: 1px solid #ccc;
  width: 600px;
  height: 400px;
  margin-top: 90px;
  position: relative;
  right: 1150px;
}

.chart-container {
  text-align: center;
  margin-top: 20px;
}
.task-text {
  margin-left: 5px;
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
  

