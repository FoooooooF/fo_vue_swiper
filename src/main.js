import Vue from "vue";
import App from './App1.vue'
import {Swiper,SwiperItem} from './component/index.js'
Vue.component("Swiper",Swiper);
Vue.component("SwiperItem",SwiperItem);
// import Swiper from '../lib/index.js'
Vue.use(Swiper)
Vue.use(SwiperItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')