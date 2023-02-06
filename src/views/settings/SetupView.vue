<!--
 * File: InitView.vue
 * Created by Dizzrt on 2023/02/06.
 * 
 * Copyright (C) 2023 The oset Authors.
 * This source code is licensed under the MIT license found in
 * the LICENSE file in the root directory of this source tree.
 -->

<template>
    <div class="main" v-if="showErrPannel">
        <el-card class="box-card" style="width: 680px; height: 420px;">
            <template #header>
                <div class="card-header">
                    <span>拉取信息初始化信息失败，请刷新页面重试</span>
                </div>
            </template>
            <div style="word-wrap: break-word;">{{ msg.err }}</div>
        </el-card>
    </div>

    <div v-if="showInitPannel">
        <el-container>
            <el-header></el-header>

            <el-main>
                <el-card class="setting-card">
                    <template #header>
                        <div class="card-header">
                            <span>发件服务设置</span>
                        </div>
                    </template>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto"
                        label-position="left">
                        <el-form-item label="Host" prop="emailHost">
                            <el-input v-model="ruleForm.emailHost" type="string" autocomplete="off" />
                        </el-form-item>
                        <el-form-item style="" label="发件账户" prop="emailAccount">
                            <el-input v-model="ruleForm.emailAccount" type="string" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="账户授权码" prop="emailAuthCode">
                            <el-input v-model="ruleForm.emailAuthCode" type="password" autocomplete="off" />
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="setting-card">
                    <template #header>
                        <div class="card-header">
                            <span>管理员账户设置</span>
                        </div>
                    </template>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto"
                        label-position="left">
                        <el-form-item style="" label="邮 箱" prop="adminEmail">
                            <el-input v-model="ruleForm.adminEmail" type="string" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="用户名" prop="adminName">
                            <el-input v-model="ruleForm.adminName" type="string" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码" prop="adminPass">
                            <el-input v-model="ruleForm.adminPass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="adminPassCheck">
                            <el-input v-model="ruleForm.adminPassCheck" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="adminVerifyCode">
                            <InputWithButton text="获取验证码" width="372px" height="32px" :click-event="getVerifyCode" />
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="setting-card">
                    <template #header>
                        <div class="card-header">
                            <span>Kafka 设置</span>
                            <el-button class="button" text>Operation button</el-button>
                        </div>
                    </template>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto"
                        label-position="left">
                        <el-form-item style="" label="Host" prop="kafkaHost">
                            <el-input v-model="ruleForm.kafkaHost" type="string" autocomplete="off" />
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-row justify="center" style="padding-top: 20px;">
                    <el-button type="primary" round size="large" style="width: 120px;">完 成</el-button>
                </el-row>
            </el-main>

            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style>
.setting-card {
    width: 480px;
    margin-bottom: 20px;
}

.main {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-container {
    justify-content: center;
    align-items: center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
</style>

<script lang="ts" setup>
import type { Axios, AxiosStatic } from 'axios';
import type { JsonObject } from 'type-fest';
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus'
import InputWithButton from '@/components/InputWithButton.vue';

const router = useRouter()
const axios = inject("axios") as AxiosStatic

const showErrPannel = ref(false)
const showInitPannel = ref(false)

const msg = reactive({
    err: '',
})

const ruleFormRef = ref<FormInstance>()

const checkIfEmpty = (rule: any, value: any, callback: any) => {
    if (!value || value === '') {
        callback(new Error('该项为必须项，请填写'))
    } else {
        callback()
    }
}

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
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.adminPassCheck !== '') {
            // if (!ruleFormRef.value) return
            // ruleFormRef.value.validateField('validatePassCheck', () => null)
            // TODO check pass again
        }
        callback()
    }
}

const validatePassCheck = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.adminPass) {
        callback(new Error("两次密码不一致"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    emailHost: '',
    emailAccount: '',
    emailAuthCode: '',
    adminEmail: '',
    adminName: '',
    adminPass: '',
    adminPassCheck: '',
    adminVerifyCode: '',
    kafkaHost: '',
})

const rules = reactive({
    emailHost: [{ validator: checkIfEmpty, trigger: 'blur' }],
    emailAccount: [{ validator: validateEmail, trigger: 'blur' }],
    emailAuthCode: [{ validator: checkIfEmpty, trigger: 'blur' }],
    adminEmail: [{ validator: validateEmail, trigger: 'blur' }],
    adminName: [{ validator: checkIfEmpty, trigger: 'blur' }],
    adminPass: [{ validator: validatePass, trigger: 'blur' }],
    adminPassCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
    adminVerifyCode: [{ validator: checkIfEmpty, trigger: 'blur' }],
    kafkaHost: [{ validator: checkIfEmpty, trigger: 'blur' }],
})

const getVerifyCode = () => {
    console.log('todo get verfify code')
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const isInited = (async () => {
    showInitPannel.value = true

    // await axios.get('/sys/getinit').then(function (response) {
    //     if (response.status == 200) {
    //         let data = JSON.parse(response.data.data) as JsonObject
    //         if (data.inited) {
    //             router.push({
    //                 path: '/home',
    //             })
    //         } else {
    //             showInitPannel.value = true

    //         }
    //     } else {
    //         msg.err = response.status.toString()
    //         showErrPannel.value = true
    //     }
    // }).catch(function (error) {
    //     msg.err = JSON.stringify(error)
    //     console.log(error)

    //     showErrPannel.value = true
    // })
})()
</script>