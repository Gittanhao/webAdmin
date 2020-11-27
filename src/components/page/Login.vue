<template>
    <div class="login-wrap">
        <div class="ms-title">提稿系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="name"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data: function () {
        return {
            ruleForm: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            let self = this;
            self.$axios.post('/user/longin', {name: this.ruleForm.name}).then((res) => {
                console.log(res.data);
                if (res.data.code != "200") {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                } else {
                    const self = this;
                    self.$refs[formName].validate((valid) => {
                        if (valid) {
                            localStorage.setItem('ms_username', self.ruleForm.name);
                            self.$router.push('/readme');
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            })
            // fetch('http://172.16.8.18:80/user/longin', {
            //     method: 'post',
            //     body: JSON.stringify({name: this.ruleForm.name}),
            //     headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            // }).then((res) => {
            //     return res.text()
            // }).then((data) => {
            //     console.log(data)
            //     if (JSON.parse(data).code != "200") {
            //         this.$message({
            //             message: JSON.parse(data).msg,
            //             type: 'error'
            //         })
            //     } else {
            //         const self = this;
            //         self.$refs[formName].validate((valid) => {
            //             if (valid) {
            //                 localStorage.setItem('ms_username', self.ruleForm.name);
            //                 self.$router.push('/readme');
            //             } else {
            //                 console.log('error submit!!');
            //                 return false;
            //             }
            //         });
            //     }
            // })
        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>
