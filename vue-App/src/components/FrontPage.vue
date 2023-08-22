<template >
<div class="head-container">
    <img   src="logo.png" alt="">
</div>
  <div>
    <div class="top-buttons" >
      <el-button v-if="!loggedIn"  class="custom-button2  " type="default">  
       <span class="custom-button2">
       <router-link to="/sign-up">Get it Now</router-link>
       </span> 
      </el-button>
      <el-button v-if="!loggedIn" class="custom-button" >
        <span class="custom-button">
          <router-link to="/login">Login</router-link>
          </span>
      </el-button>
      <el-button v-if="loggedIn"  class="custom-button2  " type="default" >  
           <span class="custom-button2">
           <router-link to="/dashboard">Dashboard</router-link>
           </span> 
      </el-button>
    </div>
    <div class="background-image">
    <img src="calender.jpg" >
</div>
</div>
<div class="paragraph-container">
    <h2>
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
 body{
    overflow: hidden;
  
 }
  
.top-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
}
.no-hover{
  pointer-events:none;
}
  .custom-button{

    padding-right: 12px;
    padding-top: 4px;
    padding-left: 12px;
    font-size: 14px;
    height: auto;
    background-color: #1C0233;
    color: white;
  }
  .el-button a{
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s; 
  background-color: transparent;
}
  .custom-button2 {
    font-size: 14px;
    padding-right: 7px;
    padding-top: 4px;
    height: auto;
    background-color: #1C0233;
    color: white;
  }
  .background-image{
   
    overflow: hidden;
    margin-top: 20px;
  
  
  }
  .head-container img{
   width: 150px;
   margin-top: 10px;
  }
  .background-image img {
    width: 100%;
    height: 100%;
  
    margin-left: 60px;
}
.paragraph-container{
    position: relative;
    bottom: 360px;
    
}
.paragraph-container h2{
    color: black;
    font-weight: 500;
}

  </style>
  