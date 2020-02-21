import Vue from "vue";
import App from './App.vue'
import Swiper from './component/index.js'
Vue.use(Swiper)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')