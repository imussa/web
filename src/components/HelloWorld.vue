<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">平台</th>
                <th class="text-left">账号</th>
                <th class="text-left">密码</th>
                <th class="text-left">描述</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in list" :key="i">
                <td class="text-left">{{item.platform}}</td>
                <td class="text-left">{{item.account}}</td>
                <td class="text-left">{{item.password}}</td>
                <td class="text-left">{{item.description}}</td>
                <td class="text-left">
                  <v-btn icon><v-icon>mdi-lead-pencil</v-icon></v-btn>
                  <v-btn icon @click="delete_item(item.url)"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
              </tr>
              <tr>
                <td class="pt-5">
                  <v-text-field outlined dense label="平台" v-model="record.platform"></v-text-field>
                </td>
                <td class="pt-5">
                  <v-text-field outlined dense label="账号" v-model="record.account"></v-text-field>
                </td>
                <td class="pt-5">
                  <v-text-field outlined dense label="密码" v-model="record.password"></v-text-field>
                </td>
                <td class="pt-5">
                  <v-textarea outlined dense rows="1" label="描述" v-model="record.description"></v-textarea>
                </td>
                <td>
                  <v-btn color="primary" @click="create_item">新建</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mixins from '../mixins'
import {listMixin, requestMixin} from '../mixins'
  export default {
    name: 'HelloWorld',

    mixins: [mixins, listMixin, requestMixin],

    model: {
      prop: 'list',
      event: 'change'
    },

    props: {
      list: {
        type: Array,
        default: ()=>{
          []
        }
      }
    },

    data: () => ({
      //
      record: {
        platform: '',
        account: '',
        password: '',
        description: ''
      }
    }),

    methods: {
      create_item () {
        let vm = this
        let instance = vm.createTokenRequest(vm.token)
        instance.post('https://imussatools.herokuapp.com/api/records/',vm.record)
        .then(res => {
          vm.createItem(vm.list, res.data)
          vm.record.platform = ''
          vm.record.account = ''
          vm.record.password = ''
          vm.record.description = ''
        })
        .catch(err => {
          console.log(err)
          vm.record.platform = ''
          vm.record.account = ''
          vm.record.password = ''
          vm.record.description = ''
        })
        console.log('create a new item')
      },
      delete_item (url) {
        let vm = this
        let instance = vm.createTokenRequest(vm.token)
        instance.delete(url)
        .then(() => {
          let index = vm.list.findIndex(item => item.url==url)
          vm.removeItemByIndex(vm.list, index)
        })
        .catch(err => {
          console.log(err)
        })
        console.log('delete a item')
      }
    }
  }
</script>
