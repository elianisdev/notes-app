<template>
  <v-layout row wrap justify-center align-center class="main">
    <v-layout row wrap justify-center align-center id="main" v-if="hasAccount">
      <v-card color="#FFB6C1">
        <v-card-title primary-title>
          <h2 class="white--text">LOG IN INTO YOUR ACCOUNT</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field color="white" label="Email" v-model="loginData.email"></v-text-field>
          <v-text-field color="white" label="Password" v-model="loginData.password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center>
            <v-btn color="success" @click="login()">log in</v-btn>
            <v-btn color="warning" @click="hasAccount = false">Register</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-layout row wrap justify-center align-center id="main" v-else>
      <v-card color="purple">
        <v-card-title primary-title>
          <h2 class="white--text">CREATE YOUR ACCOUNT</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field color="white" label="Name" v-model="registerData.name"></v-text-field>
          <v-text-field color="white" label="Email" v-model="registerData.email"></v-text-field>
          <v-text-field color="white" label="Password" v-model="registerData.password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center>
            <v-btn color="warning" @click="register()">Register</v-btn>
            <v-btn color="success" @click="hasAccount = true">log in</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      hasAccount: true,
      loginData: {},
      registerData: {}
    }
  },
  methods:{
    login(){
      let data = {
        email: this.loginData.email,
        password: this.loginData.password
      }
      axios.post('http://localhost:3000/api/login', data)
          .then((res) => {
            let user = res.data.user;
            if(user != null) {
              localStorage.setItem('user', JSON.stringify(user));
              this.$router.push('/user');
            }
          })
    },
    register() {
      let data = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password
      }

      axios.post('http://localhost:3000/api/users', data)
          .then((res) => {
            console.log(res.data.user)
          })
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  background-color: rgb(81, 133, 211);
}
</style>