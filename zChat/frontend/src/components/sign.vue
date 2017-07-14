<template>
  <div class="sign">
    <h3 style="text-align: center">{{ Type }}</h3>
    <tab>
      <tab-item selected @on-item-click="onItemClick('signin')">登录</tab-item>
      <tab-item @on-item-click="onItemClick('signup')">注册</tab-item>
    </tab>
    {{ statusCode }}
    <template v-if="signType === 'signin'">
      <group>
        <x-input title="账号" required v-model="signinInfo.username" key="signin"></x-input>
      </group>
      <group>
        <x-input title="密码" required v-model="signinInfo.password" key="signin"></x-input>
      </group>
      <divider v-if="statusCode !== '200'">信息填写有误</divider>
      <x-button type="primary" @click.native="signin" :disabled="!(signinInfo.username && signinInfo.password)">登录
      </x-button>
    </template>
    <template v-else>
      <group>
        <x-input title="账号" required v-model="signupInfo.username" key="signup"></x-input>
      </group>
      <group>
        <x-input title="密码" required v-model="signupInfo.password" :min="6"></x-input>
      </group>
      <group>
        <x-input title="确认密码" required v-model="signupInfo.repassword" :equal-with="signupInfo.password"></x-input>
      </group>
      <div class="box">
        <checker v-model="signupInfo.gender" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
          <checker-item value="m">男</checker-item>
          <checker-item value="f">女</checker-item>
          <checker-item value="x">未知</checker-item>
        </checker>
      </div>
      <divider>asd</divider>
      <x-button type="primary" @click.native="signup"
                :disabled="!(signupInfo.username && signupInfo.password && signupInfo.password === signupInfo.repassword)">
        注册
      </x-button>
    </template>
    <button @click="test">test</button>
  </div>
</template>

<script>
  import {Divider, Tab, TabItem, XInput, Group, XButton, Checker, CheckerItem} from 'vux'

  export default {
    name: 'sign',
    data () {
      return {
        signinInfo: {
          username: '',
          password: ''
        },
        signupInfo: {
          username: '',
          password: '',
          repassword: '',
          gender: ''
        },
        options: ['f', 'm', 'x'],
        signType: 'signin',
        statusCode: 200
      }
    },
    components: {
      Divider, Tab, TabItem, XInput, Group, XButton, CheckerItem, Checker
    },
    methods: {
      onItemClick: function (type) {
        this.signType = type
      },
      signin: function () {
        var that = this
        console.log(111)
        this.$http({
          url: 'signin/', method: 'POST', data: that.signinInfo
        }).then(function (res) {
          console.log(res)
          that.statusCode = res.data.code
        })
      },
      signup: function () {
        var that = this
        this.$http({
          url: 'signup/', method: 'POST', data: that.signupInfo
        }).then(function (res) {
          console.log(res)
          that.statusCode = res.data
        })
      },
      test: function () {
        console.log('test')
        this.$http({
          url: 'posts/list/', method: 'GET'
        }).then(function (res) {
          console.log(res)
        })
      }
    },
    computed: {
      Type: function () {
        if (this.signType === 'signin') {
          return '登录'
        } else {
          return '注册'
        }
      }
    }
  }
</script>

<style scoped>
  .sign {
    height: 100%
  }

  .box {
    padding: 5px;
    border-bottom: 1px solid #eee
  }

  .demo2-item {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
  }

  .demo2-item-selected {
    border-color: green;
  }
</style>
