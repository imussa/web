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
            <span class="mr-2">用户名</span>
            <v-icon>mdi-open-in-new</v-icon>
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
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
    gituhbUrl: "https://github.com/login/oauth/authorize?client_id=43fdd91adee9e67a78ad&redirect_uri=https%3A%2F%2Fimussatools.herokuapp.com%2Foauth%2Fgithub_callback%2F&scope=user%3Aemail",
    // gituhbUrl: "http://localhost:8000/oauth/github_login/",
    token: ''
  }),

  methods: {
    login () {
      let vm = this
      window.open(vm.gituhbUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
      // 通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
      window.addEventListener('message', function (e) {
        vm.setToken(e.data)
      },false)
    },
    logout () {
      this.token = ''
    },
    setToken (token) {
      this.token = token
    }
  }
};
</script>
