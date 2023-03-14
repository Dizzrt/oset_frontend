<!--
 * File: LoginView.vue
 * Created by Dizzrt on 2023/02/03.
 * 
 * Copyright (C) 2023 The oset Authors.
 * This source code is licensed under the MIT license found in
 * the LICENSE file in the root directory of this source tree.
 -->

<template>
    <el-container :style="{ width: '100%', height: '100%' }">
        <el-main
            :style="{ display: 'flex', 'align-items': 'center', 'justify-content': 'center', width: '100%', height: '100%' }">
            <el-card :style="{ width: '750px', height: '400px' }" :body-style="{ padding: '0px', display: 'flex' }">
                <img src="../assets/img/bg/bg_login.jpg" class="blur" :style="{ width: '350px' }" />
                <div :style="{ width: '400px' }">

                    <div :style="{ width: '100%', display: 'flex', 'margin-top': '50px' }">
                        <h1 :style="{ margin: 'auto' }">OSET</h1>
                    </div>

                    <div :style="{
                        width: '100%', display: 'flex', 'justify-content': 'center', 'margin-top': '50px'
                    }">
                        <el-form :style="{ width: '300px' }" ref="loginFormRef" :model="loginForm" status-icon
                            :rules="rules" label-position="top">
                            <el-form-item label="邮 箱" prop="email">
                                <el-input v-model="loginForm.email" type="email" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="密 码" prop="password">
                                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button style="margin: auto; margin-top: 25px;" type="primary"
                                    @click="submitForm(loginFormRef)">登 陆</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<style scoped>
.blur {
    filter: blur(1px);
    -webkit-filter: blur(1px);
}
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { AxiosStatic } from 'axios';
import { reactive, ref, inject } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage, type FormInstance } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const axios = inject("axios") as AxiosStatic

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
    email: '',
    password: ''
})

const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入正确的邮箱'))
    } else {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
        }
    }
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    }
    callback()
}

const rules = reactive({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            login()
        } else {
            // console.log('error submit!')
            return false
        }
    })
}

const login = async () => {
    await axios.post("/login", {
        email: loginForm.email,
        password: loginForm.password
    }).then(function (response) {
        if (response.status != 200) {
            // TODO
        } else {
            let token = response.data.token as string
            userStore.setToken(token)
            router.push('/')
        }
    }).catch(function (error) {
        ElMessage.error('Oops! something went wrong.')
        console.error(error)
    })
}

</script>
