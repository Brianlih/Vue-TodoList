import Vue from "vue";
import App from "./App.vue";
import router from './router'

Vue.config.productionTip = false;

new Vue({
  router,

  //render the App component
  render: (h) => h(App)
}).$mount("#app"); //inside a (div) with id "app".
