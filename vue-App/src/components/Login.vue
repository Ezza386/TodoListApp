<template>
    <div class="flex fixed top-0 left-0 w-screen h-screen bg-cover bg-right">
      <div class="flex justify-end items-center pr-16 relative">
        <img src="analysis.png" alt="" class="w-96">
        <p class="absolute bottom-0  text-black text-center text-base bg-white pl-2.5 pr-4 rounded-md mt-5">Start managing your tasks faster and better.</p>
      </div>
     

      <div class="flex-2 flex justify-center items-center px-5 bg-white bg-opacity-90 rounded-lg shadow-md ">
        <el-form :model="formData" :rules="rules" ref="form" @submit.native.prevent="login">
          <h1>Welcome Back!</h1>
          <br>
          <section>
            <el-form-item prop="email" >
    <el-label required>Email</el-label>
    <el-input v-model="formData.email" placeholder="Email"></el-input>
  </el-form-item>
          <el-form-item prop="password">
            <el-label>Password</el-label>
            <el-input v-model="formData.password" placeholder="Password" :type="showPassword ? 'text' : 'password'"></el-input>
          </el-form-item>

          <el-form-item>
           
             <el-button native-type="submit" type="primary">Login</el-button>
          </el-form-item>
          <el-form-item>
            <span class="text-black">Don't have an account? <router-link to="/sign-up" class="text-black">SignUp</router-link></span>
          </el-form-item>
          </section>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref,onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  
  const route = useRoute();
  const formData=ref({
          email: "",
          password: "",
  
  });
  
  const rules={
    email:[{ required: true, message: "Email is required"}],
    password: [{required: true,message: "Password is required"},
            {min: 8,message: "Minimum length should be 8."}
              ],
    showPassword: ref(false), 
    savedData:ref([]) 
  };
  const login=()=>{
    
    const findUser= rules.savedData.value.find((user)=>
        user.email===formData.value.email && user.password===formData.value.password
        );
       
        if(findUser){
          console.log('login successful');
          console.log('login',findUser);
          localStorage.setItem('loggedInUser', JSON.stringify(findUser));

       
         router.push('/my-tasks');
         
        }
        else{
          console.log('login unsuccessful');
        }
  };
  onMounted(()=>{
  loadSavedData();
  });
  const loadSavedData=()=>{
    const keys = Object.keys(localStorage);
    rules.savedData.value = keys.map((key) => JSON.parse(localStorage.getItem(key)));
  
  };
  //loadSavedData();
  
  
  </script>
  

  <style scoped>

.el-button a,.el-form-item a{
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s; 
  background-color: transparent;
}
  </style>
  