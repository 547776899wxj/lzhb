import Vue from 'vue'
import App from './App'

import index from './pages/index/main.vue'
Vue.component('index',index)

import goods from './pages/goods/list.vue'
Vue.component('goods',goods)

import auction from './pages/auction/index.vue'
Vue.component('auction',auction)

import order from './pages/order/order.vue'
Vue.component('order',order)

import user from './pages/user/index.vue'
Vue.component('user',user)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import tabbar from './pages/component/tabbar.vue'
Vue.component('tabbar',tabbar)

Vue.config.productionTip = false

uni.$config = require('./js/config/index.js')
uni.$data = require('./js/config/data.js')
uni.$toast = require('./js/ui/toast.js')
uni.$session = require('./js/session/session')
uni.$request = require('./js/net/request')
uni.$api = require('./js/service/api')
uni.$auth = require('./js/session/auth')
uni.$utils = require('./js/utils')
uni.$index = require('./js/config/index.js')
import * as formats from './js/utils/format.js'
Object.keys(formats).forEach(key => {
    Vue.filter(key, formats[key])
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()



 



