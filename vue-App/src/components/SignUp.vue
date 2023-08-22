<template>
    <div class="registration-container">
      <div class="registration-box">
        <h1 class="logo-title">
          <img src="logo.png" alt="" class="customized-logo" />
        </h1>
        <el-form
          class="registration-form"
          :model="formData"
          :rules="rules"
          ref="form"
          @submit.native.prevent="register"
        >

        <br>
       <el-row>
        <el-col :span="12">
        <el-form-item prop="fname">
          <el-label>First Name</el-label>
          <el-input v-model="formData.fname"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" >
        <el-form-item prop="bname"  class="Name-rows">
          <el-label>Last Name</el-label>
          <el-input v-model="formData.bname" ></el-input>
        </el-form-item>
      </el-col>
      </el-row>  
       <el-row>
        <el-col :span="12">
          <el-form-item  prop="email">
            <el-label>Email</el-label>
          <el-input v-model="formData.email" ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="web" class="Name-rows">
            <el-label>Mobile Number</el-label>
          <el-input v-model="formData.web" ></el-input>
        </el-form-item>
        </el-col>
       </el-row>
        <el-row>
          <el-col :span="12">
    
            <el-form-item label="" prop="password">
              <el-label>Password</el-label>
          <el-input v-model="formData.password"  type="password"></el-input>
        </el-form-item>
          </el-col>
         <el-col :span="12">
          
        <el-form-item label="" prop="cPassword" class="Name-rows">
          <el-label >Confirm Password</el-label>
          <el-input v-model="formData.cPassword"  type="password"></el-input>
        </el-form-item>
        
      </el-col>
        </el-row>
     
        <el-form-item>
          <el-button type="primary" native-type="submit" >Register</el-button>
       
          <span class="member" style="display: flex;">  Already a member?  <router-link class="nav-link" to="/login" style="color: black;">Login</router-link></span>
    
        </el-form-item>

        </el-form>
      </div>
    </div>
  </template>
    <script setup>
    import { v4 as uuid } from 'uuid';
    import {ref, onMounted } from 'vue';
    
    const formData=ref({
            fname: "",
            bname: "",
            email: "",
            web:"",
            password: "",
            cPassword: "",
    });
    const validateConfirmPassword = (rule, value, callback) => {
          if (value === formData.value.password) {
          
            callback();
          } else {
            callback(new Error("Passwords do not match"));
          }
    };
    const rules={
      fname: [{required: true, message: "First Name is required"}],
      bname: [{ required: true, message: "Last Name is required" }],
      email: [{ required: true, message: "Please enter your Email" }],
      password: [
        { required: true, message: "Password is required" },
        { min: 8, message: "Password must be 8 characters long" },
      ],
      cPassword: [
      {required: true,message: "Password is required"},
      {min:8, message: "Password must be 8 characters long"},
      {validator: validateConfirmPassword}
      ],
    };
    const register=()=>{
      console.log("Registration Data:", formData.value);
          const userData = {
            fname: formData.value.fname,
            bname: formData.value.bname,
            email: formData.value.email,
            web: formData.value.web,
            password: formData.value.password,
            cPassword: formData.value.cPassword,
          };
          const key= uuid();
              localStorage.setItem(key, JSON.stringify(userData));
    };
    const loadSavedData=()=>{
      const savedData = JSON.parse(localStorage.getItem('userData'));
          if (savedData) {
            Object.assign(formData.value, savedData);
           
          }
    
    };
    onMounted(loadSavedData);
    
    </script>
    
    
    <style>
    .dot{
      color: rgb(105, 105, 255);
      font-size: 50px;
    }
    .Name-rows{
      margin-left: 20px;
    }
    
    .divisions{
    justify-content: left;
    }
.registration-container {
  display: flex;
  justify-content: center;
  margin-left: 250px;
  align-items: center;
  min-height: 100vh;
 
}

.registration-box {
  width: 700px;
  
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-title {
  text-align: center;
  margin-bottom: 20px;
}

.customized-logo {
  width: 150px;
}
    </style>
    
    