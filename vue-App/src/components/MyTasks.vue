<template>
<div>
 <el-row class="tac">
   <el-col >
      <div class=" flex h-screen">  
        <div class=" flex justify-end bg-[#efecf2] h-14 w-screen mb-32">
          <el-icon  class=" mb-full bg-[#efecf2] cursor-pointer mr-[720px] mt-0.5" @click="toggleNavbar" :class="{ 'button-closed': !isNavbarOpen }"><Expand /></el-icon>
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

     <!--     <el-menu-item index="4">
            <el-icon><Aim /></el-icon>
            <span>My Goals</span>
          </el-menu-item>-->
        </el-menu>
      </div>
      </el-col>
    </el-row>

  </div>

    <div class="  justify-center border border-gray-300 w-650 h-400 mt-20 relative right-0 left-[-850px] ">
  
      <div class="flex">
        <el-input v-model="taskInput" placeholder="Enter Todo"  class="w-600 mt-6  ml-2 h-7" />
        <el-button @click="addTask"  class="ml-2 mr-10 mt-6 text-white bg-color[]" style="background-color:#1C0233 ;" >Add Todo</el-button>
      </div>
      <el-table :data="tableData" class="w-full ">
        <el-table-column prop="task" label="Tasks" width="200">
          <template #default="scope">
            <div class="task-cell">
              <span v-if="!scope.row.isEditing" class="ml-1">{{ scope.row.task }}</span>
              <el-input
                v-else
                v-model="scope.row.task"
               class="w-4/5"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="130">
          <template #default="scope">
          
            <div :style="getStatusStyle(scope.row.status)" >
             
              <el-button size="mini" @click="toggleStatus(scope.row)" :style="getStatusStyle(scope.row.status)" style="border: none;">
                {{ scope.row.status }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label="Operations" width="130">
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
      <div class="text-center mt-20 w-[400px] h-[400px]" >
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

  .el-menu-vertical-demo {
flex: 1;
width: 180px;
font-size: 12px;
height: 100%;
position: fixed;
top: 0;
left: 0;
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
  right: 450px;
  width: 200px;
  height: 60px;
  background-color: #efecf2;
}

</style>
  

