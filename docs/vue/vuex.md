---
title: "vuex"
---
## vuex使用

### vuex购物车基本用法

####  vuex使用Bug

购物车页面刷新时，vuex实例从新加载，vuex里的数据重新加载
解决方法：在sessionStorage和数据库都保存一份，因为直接从数据库请求是异步会出现空白，用户体验不好。

```js
// main.js全局注册vuex
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'//引入路由vue-router的模块  名字需router
import store from './store/index' // 引入vuex模块 名字需要是store

Vue.config.productionTip = false

new Vue({
  router,
  store,//全局注册一次vuex
  render: h => h(App)
}).$mount('#app')
########################

// store/index.vue
// 导入vue
import Vue from 'vue'
// 引入vuex模块
import Vuex from 'vuex'

Vue.use(Vuex)

let cars = window.sessionStorage.getItem('cars')

// 实例化vue仓库的对象
const store = new Vuex.Store({
  // State存放的是共享文件
  state: {
    // 数据集合
    goods: [
      { id: 1, name: 'apple', price: 10 },
      { id: 2, name: 'banana', price: 20 },
      { id: 3, name: 'orange', price: 30 },
      { id: 4, name: '西瓜', price: 40 }
    ],
    // 购物车数据集合
    cars: cars ? JSON.parse(cars) : []
  },

  // getter 类似于state的computed （计算属性表），调用该方法会接受一个参数state参数数当前仓库实例的数据
  getters: {
    goodsNum (state) {
      return state.goods.length
    },
    carNum (state) {
      return state.cars.length
    },
    carTotal (state) {
      return state.cars.reduce((totol, item) => {
        return totol + item.total
      }, 0)
    }

  },
  // mutations唯一可以修改states仓库数据的地方  只能同步修改，自动接受第一个参数是state（当前仓库实例化对象） 第二个是组件传过来的数据 payload
  mutations: {
    addCar (state, id) {
      console.log('添加商品', id)
      // 取出商品对象
      const good = state.goods.find(item => item.id === id) // 返回的是一个对象
      // console.log(good)
      // 判断商品是否在购物车中
      const index = state.cars.findIndex(item => item.id === id)
      // console.log(index)
      if (index > -1) {
        state.cars[index].num++
        state.cars[index].total += good.price
      } else {
        state.cars.push({ ...good, num: 1, total: good.price })
      }
      window.sessionStorage.setItem('cars', JSON.stringify(state.cars))
    },
    delCarAsync (state, id) {
      console.log('移除商品', id)
      // 取出商品对象
      const good = state.cars.find(item => item.id === id) // 返回的是一个对象
      console.log(good)
      // 判断商品是否在购物车中
      const index = state.cars.findIndex(item => item.id === id)//找到返回找到的index，否则返回-1
      console.log(index)
      if (index > -1) {
        state.cars[index].num--
        state.cars[index].total -= good.price
      }
      window.sessionStorage.setItem('cars', JSON.stringify(state.cars))
    }
  },
  // actions 存放的是action这里可以一步去修改state数据，不是直接去修改 而是调用某个mutations
  // 第一个参数，是自动接受到的context（上下文对象，当前的仓库实例） 常用结构方法结构出{commit}
  // 第二个参数是传递过来的参数
  // 跟mutation的区别可以实现异步代码
  // 要修改state的数据 是通过context.commit（）再去调用 context.commit(addCar)， 
  actions: {
    delCarAsync ({ commit }, id) {
      console.log(commit, id)
      setTimeout(() => {
        commit('delCarAsync', id)
      }, 1000)
    }
  }
})

export default store
##########################################
// googs.vue 组件中使用

// <template>
// <div>
// <h1>商品页</h1>
// <p>商品数量: {{ goodsNum }}</p>
// <ul>
//   <li v-for="item in goods" 
// :key="item.id">ID:{{item.id}}-名字{{ item.name }}-价格{{item.price}}
//   <button @click="addCar(item.id)">添加</button>
//   <button @click="delCarAsync(item.id)">移除</button>
//   </li>
// </ul>
// </div>
// </template>

// <script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['goods']),
    // goods () {
    //   return this.$store.getters.goods
    // },
    ...mapGetters(['goodsNum'])
  },
  methods: {
    ...mapMutations(['addCar', 'delCarAsync']),
    // addCar (id) {
    //   return this.$store.commit(id)
    // }
    ...mapActions(['delCarAsync'])
    // delCarAsync (id) {
    //   // 第一个参数传递的是名字 action调用的名字  标记
    //   return this.$store.dispatch('delCarAsync', id)
    // }
  },
  created () {
    console.log(this.$store.state)
  }

}
// </script>
// <style scoped>
// li{
//   list-style-type: none;
// }
// </style>


```

### vuex数据存储数据库

#### vuex数据存储数据库思路

整个的流程是在组件的create中提交dispatch，然后通过action调用一个封装好的axios然后再触发mutation来提交状态改变state中的数据，然后在组件的计算属性中获取state的数据并渲染在页面上

```js
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

  state:{
    
    user:[
      {id: 1, name: 'lai', age: 24, sex: 1},
      {id: 2, name: 'ling', age: 34, sex:0},
      {id: 3, name: 'yun', age: 39, sex:1},
      {id: 4, name: 'ping', age: 20, sex:0}
    ],
    dataList:[]

  },
  getters:{

    small(state){
      let users = JSON.stringify(state.user)
      let user= JSON.parse(users)
     user.forEach(item=>{
        if(item.sex===1){
          return item.sex = "男"
        } else if(item.sex===0){
          return item.sex="女"
        }
      })
      return user
    },
    base:state=>state.dataList
  },
 
  mutations:{
    addCar(state,id){
      const user= state.user.find(item=>item.id===id)
      // console.log(state.dataList)
     const index= state.dataList.findIndex(item=>item.id===id)
     if(index>-1){
      let ages= state.dataList[index].age +=10
      let nums=state.dataList[index].num ++
      console.log(ages,nums)
       Axios({
        url: `http://localhost:3000/user/${id}`,
        method: 'patch',
        data:{
          age:ages,
          num:nums
        }
      }).then(() => {
        console.log('替换成功')
      })
     }else{
       state.dataList.push({...user,num:1})
       Axios({
            url: `http://localhost:3000/user`,
            method: 'post',
            data:state.dataList[state.dataList.length-1]
          }).then(() => {
            console.log('添加成功')
          })
      
     }
     console.log(state.dataList)
    },

    getData(state,res){
      state.dataList=res.data
      console.log(res.data)
    }


  },
  actions:{
    getData({commit}){
      Axios.get('http://localhost:3000/user').then(res=>{
        console.log(res.data)
        console.log(res)
          commit('getData',res)
      })
    }
    // upData({commit,state}){
    //   Axios({
    //     url: `http://localhost:3000/user`,
    //     method: 'post',
    //     data:state.dataList
    //   }).then((res) => {
    //     console.log('添加成功')
    //     commit('upData',res)
    //   })
    // }
  },
})

export default store

```