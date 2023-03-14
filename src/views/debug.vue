<!--
 * File: debug.vue
 * Created by Dizzrt on 2023/02/27.
 * 
 * Copyright (C) 2023 The oset Authors.
 * This source code is licensed under the MIT license found in
 * the LICENSE file in the root directory of this source tree.
 -->

<template></template>

<script setup lang="ts">
import type { AxiosStatic } from 'axios';
import { inject } from 'vue';
import { useRoute } from 'vue-router';

const axios = inject("axios") as AxiosStatic

const route = useRoute();
const aid = route.params["aid"];
const did = route.params["did"];

const source = 'http://localhost:8080/event/tool/realtime/' + aid + '/' + did;
var e = new EventSource(source);
e.onmessage = function (event) {
    console.log(event.data);
};

// var e = new EventSource('/event/tool/123/321');
// e.onmessage = function (event) {
//     console.log(event.data);
// };

</script>