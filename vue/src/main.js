import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import {
  axios_get,
  axios_post
} from './utils/axios';
import lodash from "lodash";

Vue.use(ViewUI);
Vue.prototype.$ajaxGet = axios_get;
Vue.prototype.$ajaxPost = axios_post;
Vue.prototype.$_ = lodash;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
