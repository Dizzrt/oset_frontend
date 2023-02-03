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

import App from './App.vue'
import router from './router'

import axios from "axios"

const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8080"

app.provide("axios", axios)

app.use(createPinia())
app.use(router)

app.mount('#app')
