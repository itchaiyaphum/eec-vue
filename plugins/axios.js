import axios from 'axios'
import Vue from 'vue'

Vue.http = axios
Vue.prototype.$http = axios

