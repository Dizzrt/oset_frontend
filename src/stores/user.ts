//
// File: user.ts
// Created by Dizzrt on 2023/03/14.
// 
// Copyright (C) 2023 The oset Authors.
// This source code is licensed under the MIT license found in
// the LICENSE file in the root directory of this source tree.
// 

import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        _token: '',
    }),

    getters: {
        token: (state) => state._token,
    },

    actions: {
        setToken(t: string) {
            this._token = t;
        }
    },
    persist: {
        enabled: true,
        strategies: [{
            storage: localStorage,
        }]
    },
});