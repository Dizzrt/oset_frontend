<!--
 * File: InputWithButton.vue
 * Created by Dizzrt on 2023/02/06.
 * 
 * Copyright (C) 2023 The oset Authors.
 * This source code is licensed under the MIT license found in
 * the LICENSE file in the root directory of this source tree.
 -->

<template>
    <div :style="{ 'width': width, 'height': height, 'display': 'flex' }">
        <input />
        <button @click="handleClick">{{ text }}</button>
    </div>
</template>

<style scoped>
input {
    outline: 0;
    border-top-style: solid;
    border-left-style: solid;
    border-bottom-style: solid;
    border-right-style: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-color: #dddfe6;
    border-width: 1px;
    width: 61.8%;
}

button {
    width: 38.2%;
    border-style: none;
    border-color: #3f9eff;
    color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #3f9eff;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    font-size: var(fontSize);
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
}

input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
}

button:hover {
    background-color: #79bbff;
    color: white;
}

button:active {
    background-color: #337ecc;
    color: white;
}
</style>

<script lang="ts" setup>

const props = defineProps({
    width: {
        type: String,
        default: '120px',
    },
    height: {
        type: String,
        default: '40px'
    },
    splitPercent: {
        // type:
    },
    text: {
        type: String,
        default: 'button'
    },
    clickEvent: {
        type: Function,
        default: () => { }
    }
})

const handleClick = () => {
    props.clickEvent()
}



</script>