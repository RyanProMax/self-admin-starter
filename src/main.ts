import { createApp } from 'vue';
import App from './App.vue';
import router from '~/router';

// global style
import './styles/index.scss';

const app = createApp(App);

// router
app.use(router);

app.mount('#app');
