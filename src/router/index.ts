// 
// File: index.ts
// Created by Dizzrt on 2023/02/03.
// 
// Copyright (C) 2023 The oset Authors.
// This source code is licensed under the MIT license found in
// the LICENSE file in the root directory of this source tree.
// 

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import("../views/HomeView.vue") },
    { path: '/login', name: 'login', component: () => import("../views/LoginView.vue") },
    { path: '/register', name: 'register', component: () => import("../views/RegisterView.vue") },
    { path: '/settings/setup', name: 'setup', component: () => import("../views/settings/SetupView.vue") },
    { path: '/event/tool/realtime/:aid/:did', component: () => import("../views/debug.vue") }
  ]
})

export default router
