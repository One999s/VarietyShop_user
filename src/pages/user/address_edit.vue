<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-21 22:07:59
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-22 16:27:40
 * @FilePath: \varietyShop\frontend\users\src\pages\user\address_edit.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view class="page_address">
        <uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
        :title="navTitle"
        backgroundColor="#08A1DB"
        color="#fff"
        >
        </uni-nav-bar>
        <map
        class="ae_map"
        :latitude="detail.latitude"
        :longitude="detail.longitude"
        :markers="covers"
        :enable-scroll="false"
        :enable-zoom="false"
        :enable-rotate="false"
        >
		</map>
        <view class="p_a_main">
            <view class="p_a_card">
                <uni-forms :modelValue="formData" ref="formRef" label-width="140rpx">
                    <uni-forms-item label="地址" >
                        <!-- <uni-easyinput type="text" disabled :inputBorder="false" value="选择收获地址" suffixIcon="right"
                        :styles="{color:'#08A1DB !important'}"
                        /> -->
                        <view class="p_a_address_choose" @click="handleChooseAddress">
                            <view v-if="false">
                                <view>奥术大师</view>
                                <view class="address_d">多大的130号</view>
                            </view>
                            <view v-else class="choose_tips">选择收货地址</view>
                            <uni-icons type="right" color="#D1D1D1"/>
                        </view>
                    </uni-forms-item>
                    <uni-forms-item label="详细地址" name="detailed" >
                        <uni-easyinput type="text" :inputBorder="false" v-model="formData.detailed" placeholder="详细地址" />
                    </uni-forms-item>
                    <view class="ae_form_box">
                        <uni-forms-item label="姓名" name="name">
                            <uni-easyinput type="text" :inputBorder="false" v-model="formData.name" placeholder="姓名" />
                        </uni-forms-item>
                        <uni-forms-item label="" name="sex" label-width="0">
                            <radio-group @change="binddata('sex',$event.detail.value,'formRef')">
                                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sexData" :key="index">
                                    <view>
                                        <radio :value="item.value" :checked="item.value === formData.sex" color="#08A1DB" />
                                    </view>
                                    <view>{{item.text}}</view>
                                </label>
                            </radio-group>
                        </uni-forms-item>
                    </view>
                    <uni-forms-item label="手机号" name="mobile">
                        <uni-easyinput type="text" :inputBorder="false" v-model="formData.mobile" placeholder="手机号" />
                    </uni-forms-item>
                </uni-forms>
            </view>
            <view class="p_a_card p_a_handle">
                <button type="primary" :disabled="formData.name&&formData.mobile&&formData.address">保存地址</button>
            </view>
        </view>
    </view>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import locationFn from '@/common/utils/location.js';
    export default{
        setup(){
            const instance = getCurrentInstance();
            const navTitle = ref("新增收获地址")
            const detail = ref({
                latitude:'',
                longitude:'',
                address:"泉州信息工程学院",
                detailed:"光大银行旁",
                name:"Q",
                mobile:"13333333333",
            })
            const formRef = ref(null);
            const covers = ref([]);// 地图坐标点
            const formData = ref({address:"泉州"});
            const sexData = ref([
                {
					text: '先生',
					value: 0
				}, {
					text: '女士',
					value: 1
				}
            ])
            locationFn.getLocation()
            .then(res=>{
                console.log(res)
                detail.value.latitude = res.latitude;
                detail.value.longitude = res.longitude;
                covers.value = [
                    {
                        id:0,
                        width:35,height:50,
                        latitude: res.latitude,
                        longitude: res.longitude,
                    }
                ]
            })
            
            const handleChooseAddress = ()=>{
                uni.navigateTo({
                     url: `/pages/user/address_choose?backURL=/${instance.__route__}`
                });
            }
            return {
                navTitle,
                detail,
                covers,
                formData,
                sexData,
                formRef,
                handleChooseAddress,
            }
        }
    }
</script>


<style lang="scss" scoped>
    $mapHeight:300rpx;
    .page_address{
        background: $theme_bg;
    }
    .p_a_main{
        padding: $space_padding;
        transform: translateY(- calc($mapHeight / 2));
        border-radius: 15rpx;
    }
    .ae_map{
        width: 100%;
        height: $mapHeight;
    }
    .p_a_card{
        background: #fff;
        border-radius: 15rpx;
        padding: $space_padding;
        z-index: 9999;
    }
    .ae_form_box{
        display: flex;
        align-items: center;
        
        radio-group,label{
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        label{margin:0 10rpx;}
        radio{transform: scale(.8);}
    }
    .p_a_handle{
        margin-top: 20rpx;
        button{
            background: linear-gradient(to right,$theme_color,$theme_color2);

        }
    }
    .p_a_address_choose{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        .address_d{
            color: rgba($color: #000000, $alpha: .5);
            font-size: 24rpx;
        }
    }
    .choose_tips{
        color: $theme_color;
    }
</style>