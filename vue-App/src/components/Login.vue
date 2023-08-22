<template>
    <div class="login-container">
      <div class="image-container">
        <img src="analysis.png" alt="" class="analysis-image">
        <p class="image-description">Start managing your tasks faster and better.</p>
      </div>

      <div class="login-form-container">
        <el-form class="login-form" :model="formData" :rules="rules" ref="form" @submit.native.prevent="login">
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
            <span class="member">Don't have an account? <router-link to="/sign-up" style="color: black;">SignUp</router-link></span>
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
  

  <style>

  .login-container {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
  }
  .member{
    color: black;
  }
  .image-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 60px; 
    position: relative;
  }
  
  .analysis-image {
    width: 350px;
  }
  
  .login-form-container {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
  .image-description {
  position: absolute;
 margin-top: 330px;

  font-size: 16px;
  color: black;
  text-align: center;

  padding: 10px 20px;
  border-radius: 4px;
}
.el-button a,.el-form-item a{
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s; 
  background-color: transparent;
}
  </style>
  