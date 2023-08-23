<template >
<div class="w-36 h-16 mt-30">
    <img   src="logo.png" alt="">
</div>
  <div>
    <div class="fixed bottom-80 right-10 top-2" >
      <el-button v-if="!loggedIn"  class="text-sm h-auto bg-purple text-white bg-[#1c0233]" style="background-color:#1C0233 ;">  
       <span class="text-sm px-2 h-auto bg-purple text-white">
       <router-link to="/sign-up">Get it Now</router-link>
       </span> 
      </el-button>
      <el-button class="text-sm h-auto disabled:pointer-events-none" v-if="!loggedIn" style="background-color:#1C0233 ;" >
        <span class="px-3  text-sm h-auto text-white">
          <router-link to="/login" class="disabled:pointer-events-none">Login</router-link>
          </span>
      </el-button>
      <el-button v-if="loggedIn"  class="text-sm h-auto  bg-purple-900 " style="background-color:#1C0233 ;">  
           <span class="px-3  text-sm h-auto text-white">
           <router-link to="/dashboard">Dashboard</router-link>
           </span> 
      </el-button>
    </div>
    <div class="mt-10">
     
    <img src="calender.jpg" >
  
</div>

</div>
<div class="relative bottom-96">
    <h2 >
        Empower your productivity with our sleek and intuitive todo list platform – your ultimate companion in conquering tasks, one checkmark at a time.
   </h2>
</div>
</template>
  
  <script setup>
  import {ref,onMounted } from 'vue';
  const loggedIn=JSON.parse(localStorage.getItem('loggedInUser'));
  onMounted(()=>{
    
  });
  </script>
  
  <style scoped>
.el-button a,.el-form-item a{
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s; 
  background-color: transparent;
}
  


  </style>
  