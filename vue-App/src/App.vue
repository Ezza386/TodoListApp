<script setup>

</script>

<template>

  
  <router-view></router-view>

</template>

<style >
body{
    overflow:hidden;
  padding: none;
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

</style>
