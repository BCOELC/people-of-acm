// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VueLazyLoad from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Bootstrap)
Vue.use(VueAnalytics, {
  id: 'UA-107750643-1',
  router
})
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  attempt: 1,
  lazyComponent: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
