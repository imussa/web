<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-spacer></v-spacer>

      <v-menu v-if="token"
        offset-y
      >
        <template v-slot:activator="{ on, attrs}">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <span class="mr-2">{{username}}</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else
        @click="login"
        outlined
        text
      >
        <span>登录</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld v-model="list">
      </HelloWorld>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import mixins from './mixins'
import {requestMixin} from './mixins'

export default {
  name: 'App',

  mixins: [mixins, requestMixin],

  created: function () {
    let token = window.localStorage.getItem('token')
    let username = window.localStorage.getItem('username')
    if(token != null){
      this.setToken(token)
      this.setUsername(username)
    }
  },

  mounted: function () {
    let vm = this
    vm.get_records()
  },

  components: {
    HelloWorld,
  },

  data: () => ({
    //
    gituhbUrl: "https://github.com/login/oauth/authorize?client_id=43fdd91adee9e67a78ad&redirect_uri=https%3A%2F%2Fimussatools.herokuapp.com%2Foauth%2Fgithub_callback%2F&scope=user%3Aemail",
    // gituhbUrl: "http://localhost:8000/oauth/github_login",
    list: []
  }),

  methods: {
    login () {
      let vm = this
      window.open(vm.gituhbUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
      // 通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
      window.addEventListener('message', function (e) {
        vm.setToken(e.data.token)
        vm.setUsername(e.data.username)
        window.localStorage.setItem('token', e.data.token)
        window.localStorage.setItem('username', e.data.username)
        vm.get_records()
      },false)
    },
    logout () {
      this.setToken('')
      this.setUsername('')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      this.list = []
    },
    get_records () {
      let vm = this
      let instance = vm.createTokenRequest(vm.token)
      instance.get('https://imussatools.herokuapp.com/api/records/')
      .then(res => {
        vm.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>
