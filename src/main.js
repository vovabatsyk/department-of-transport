import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'
import Loader from './components/Loader'
import VueClipboard from 'vue-clipboard2'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueClipboard)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: 'AIzaSyCHqFbSS4KCdOuxockYpLWSgEOJu5GGqLk',
    authDomain: 'inspector-parking.firebaseapp.com',
    databaseURL: 'https://inspector-parking.firebaseio.com',
    projectId: 'inspector-parking',
    storageBucket: 'inspector-parking.appspot.com',
    messagingSenderId: '932875370370',
    appId: '1:932875370370:web:30677a65c01081e512999b'
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})


