import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.gif'
import './assets/reset.stylus'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

Vue.config.productionTip = false


Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loading,
  attempt: 1,
  listenEvents: ['wheel'],
  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
       
        // el.style.opacity = '1'
        // el.style.transition = 'opacity 1.35s'
    },
    loading (listender, Init) {
        // listender.el.style.opacity = 0
        console.log('loading')
    },
    error (listender, Init) {
        console.log('error')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
