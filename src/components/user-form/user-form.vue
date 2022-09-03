<template>
    <view  class="user_form" >
        <uni-forms ref="formRef" :model="formData" :rules="rules">
		
			<uni-forms-item name="username">
				<uni-easyinput
                prefixIcon="person-filled"
                :inputBorder="false"
                class="input" v-model="formData.username" type="text" :placeholder="type==1?'邮箱/手机号':'邮箱'" />
			</uni-forms-item>
            <uni-forms-item name="code" v-if="type!=1">
				<uni-easyinput
                :inputBorder="false"
                prefixIcon="mail-open-filled"
                class="input" :maxlength="6" v-model="formData.code" type="text" placeholder="验证码" >
                    <template #right>
		                <button class="submit bt_radius bt_getcode" @click="handleGetCode" size="mini">{{codeTime>0?codeTime:"获取验证码"}}</button>
                    </template>
                </uni-easyinput>
			</uni-forms-item>
            <uni-forms-item name="password">
				<uni-easyinput
                prefixIcon="locked-filled"
                :inputBorder="false"
                type="text" password  v-model="formData.password" placeholder="请输入您的密码" />
			</uni-forms-item>
            <uni-forms-item name="passwordConfirm" v-if="[0,2].includes(type)">
				<uni-easyinput
                :inputBorder="false"
                prefixIcon="locked-filled"
                type="text" password  v-model="formData.passwordConfirm" placeholder="请再次输入您的密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit bt_radius" @click="submit" >{{transType(type)}}</button>
        <view class="row_handle">
                <view v-if="type==1" @click="()=>handleToRoute('register')">立即注册</view>
                <view v-if="[0,2].includes(type)" @click="()=>handleToRoute('login')">立即登录</view>
                <view @click="()=>handleToRoute('forget')">忘记密码</view>
        </view>
    </view>
</template>

<script>
import {ref,reactive} from 'vue';
import {debounce} from '@/common/utils/function';
export default {
    props:{
        type:{type:String||Number}
    },
    setup(props,{emit}){
        const {type} = props;
        const formData = reactive({})
        const codeTime = ref(0);//验证码倒计时
        let codeRuner = null;//倒计时函数

        const formRef = ref(null)

        const rules = {
            username: {
                rules: [{
                    required: true,
                    errorMessage: `请输入${type==1?'用户名或邮箱':'邮箱'}`,
                },
                type!=1?{
                    format: 'email',
                    errorMessage: '域名格式错误'
				}:{}
                // {
                //     minLength: 3,
                //     maxLength: 5,
                //     errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
				// }
                ]
			},
			// 对email字段进行必填验证
            password: {
                rules: [{required:true,errorMessage:"请输入密码"}]
			},
            passwordConfirm: {
                rules: [
                    {required:true,errorMessage:"请输入密码"},
                    {
                        validateFunction: (rule, value, data, callback) => {
                            if(value!==data.password){
                                return callback("两次密码不一致")
                            }
                            callback()
						}
                    }
                ]
			},
            code:{
                rules:[
                    {required:true,errorMessage:"请输入验证码"},
                ]
            }
		}

        const typeObj = {
            "0":"注册",
            "1":"登录",
            "2":"找回密码"
        }
        
        const submit = debounce(()=>{
            formRef.value.validate()
            .then(res=>{
                console.log("res",res);
                uni.reLaunch({ url: '/pages/index/index' })
            })
        },1000)

        const handleToRoute = (type)=>{
            uni.redirectTo({url:`/pages/user/${type}`});
        }
        const transType = (type)=>{
            return typeObj[type]||"提交"
        }
        
        const handleGetCode = ()=>{
            //获取验证码
            if(codeTime.value!=0) return;

            formRef.value.validateField(['username'],err=>{
                if(!err){
                    codeTime.value = 60;
                    codeRuner = setInterval(()=>{
                        if(codeTime.value<=0){
                            codeTime.value = 0;
                            clearInterval(codeRuner);
                            codeRuner = null;
                            return
                        }
                        codeTime.value-=1
                    },1000)
                }
            })
            
        }
        return {
            formData,
            rules,
            formRef,
            submit,
            type:Number(type),
            handleToRoute,
            transType,
            handleGetCode,
            codeTime
        }
    }
}
</script>

<style lang="scss" scoped>
    .user_form{
        margin: 40rpx 0;
        .submit{
            background-image: linear-gradient($theme_color,$theme_color2);
            color:$theme_bg_text_color;
            margin-top: 80rpx;
        }
        .row_handle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40rpx;
        }
    }
    .bt_getcode{
        width: 35%;
        margin: 0 !important;
    }
</style>