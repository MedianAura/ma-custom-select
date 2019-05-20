import Vue, { VNode } from 'vue'
import App from './App.vue'
import { VigilanceSelectPlugin } from '@/plugin'

Vue.use(VigilanceSelectPlugin)
Vue.config.productionTip = false

new Vue({
  render: (h): VNode => h(App)
}).$mount('#app')
