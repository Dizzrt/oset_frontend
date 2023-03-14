// 
// File: main.ts
// Created by Dizzrt on 2023/02/03.
// 
// Copyright (C) 2023 The oset Authors.
// This source code is licensed under the MIT license found in
// the LICENSE file in the root directory of this source tree.
// 

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import './assets/css/global.css'
import 'element-plus/dist/index.css'

import App from './App.vue'
import axios from "axios"
import router from './router'
import ElementPlus from 'element-plus'

const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8080"

app.provide("axios", axios)

app.use(router)
app.use(ElementPlus)
app.use(createPinia().use(piniaPluginPersist))

app.mount('#app')
