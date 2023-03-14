<!--
 * File: HomeView.vue
 * Created by Dizzrt on 2023/02/03.
 * 
 * Copyright (C) 2023 The oset Authors.
 * This source code is licensed under the MIT license found in
 * the LICENSE file in the root directory of this source tree.
 -->

<template>
  <InputWithButton fontSize="24px" width="200px" :clickEvent=test></InputWithButton>
</template>
 

<script setup lang="ts">
import InputWithButton from '../components/InputWithButton.vue'

const test = () => {
  console.log("clicked")
}

</script>

