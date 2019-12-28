import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Internationalization
import i18n from './i18n';

// Global injections
// *********************

// Plugins
import './plugins/vuePlugins';
import './plugins/thirdPartyPlugins';
import './plugins/globalComponents';
import './plugins/filters';
import './plugins/helpers';
import './plugins/errorsHandler';

// Apis
import './api/independentEosApi';

// Constants
import './plugins/constants';

// Event bus
import './plugins/eventBus';

// Vuetify UI kit
import vuetify from './plugins/vuetify';
// import 'vuetify/dist/vuetify.min.css';

// *********************
// End global injections

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app');
