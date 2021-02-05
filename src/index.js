import {Swiper,SwiperItem} from './component/index.js'

const install = function (Vue, ) {
    Vue.component("Swiper", Swiper);
    Vue.component("SwiperItem", SwiperItem);
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Swiper,
    SwiperItem
}