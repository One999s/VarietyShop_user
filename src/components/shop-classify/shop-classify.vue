<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-16 09:54:29
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-18 10:49:55
 * @FilePath: \varietyShop\frontend\users\src\components\shop-classify\shop-classify.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
    <view :class="{
        'shop_classify':true,
        'classifyStyle':classifyStyle,
    }">
    
        <scroll-view class="sc_list" scroll-x>
            <view v-for="(item,index) in state.classifyList"
                :key="index"
                class="sc_item"
                @click="()=>handleClickClassify(item)"
            >
            {{item}}
            </view>
        </scroll-view>
        <view class="sc_menu" @click="()=>handleClickClassify('menu')">
            <uni-icons type="bars" :size="18"/>
        </view>
        <uni-popup ref="popup_menu" type="top"
        >
            <view class="sc_menu_box"
                :style="{'margin-top':marginTop}"
            >
                <view class="sc_menu_title">人均价筛选</view>
                <view>
                    <slider-bothway ref="sliderRef" 
                    v-model="shopClassify.priceValues"
                    :max="shopClassify.max"
                    :min="shopClassify.min"
                    :step="shopClassify.step"
                    @right="sliderRight"
                    />
                </view>

                <view v-for="(item,index) in shopFilter"
                :key="index"
                >
                    <view class="sc_menu_title">{{item.name}}</view>
                    <view class="sc_options_list">
                        <view 
                        v-for="(citem,ci) in item.options"
                        :key="ci"
                        :class="{
                            'sc_option':true,
                        }"
                        @click="()=>handleChooseFilter(item.single,item,citem)"
                        >
                            <view
                            :class="{
                                'choose':shopFilterChoose[item.name]&&shopFilterChoose[item.name].includes(citem.label)
                            }"
                            >{{citem.label}}</view>
                        </view>
                    </view>
                </view>

                <view class="sc_menu_footer">
                    <button class="reset"
                    @click="resetFilter"
                    >重置</button>
                    <button class="submit"
                    @click="submitFilter"
                    >
                        完成 <text v-if="shopFilterChooseLength">已选({{shopFilterChooseLength}})</text>
                    </button>
                </view>
            </view>
        </uni-popup>
        
    </view>
</template>

<script>
import { computed, nextTick, reactive,ref, watch } from 'vue';
    
    export default {
        props:{
            classifyStyle:Boolean,
            top:String
        },
        setup(props,{emit}){
            const sliderRef = ref(null);
            const popup_menu = ref(null);
            const classifyStyle = computed(()=>props.classifyStyle);
            const marginTop = computed(()=>props.top);
            const state = reactive({
                classifyList:['点评高分','减配送费','会员商家'].concat(['点评高分','减配送费','会员商家']),
            })
            const shopClassify=reactive({
                priceValues:[0,100],
                min:0,
                max:100,
                step:2,
                right:0,
            })

            const shopFilter = reactive([
                {name:'速度',single:true,options:Array.from(new Array(8),(v,k)=>({label:`${k+1}0分钟内`}))},
                {name:'商家特色',options:Array.from(new Array(8),(v,k)=>({label:`${k}新商家`}))},
            ])
            const shopFilterChoose = reactive({})
            const shopFilterChooseLength = computed(()=>{
                let length = 0;
                Object.keys(shopFilterChoose).map(key=>{
                    if(shopFilterChoose[key]&&shopFilterChoose[key].length){
                        length+=(key==='price'?1:shopFilterChoose[key].length)
                    }
                })
                return length
            })
            
            const filterPrice = (newValue)=>{
                if(newValue[0]==shopClassify.min&&shopClassify.right){
                    shopFilterChoose['price'] = null;
                    delete shopFilterChoose['price']
                }else{
                    shopFilterChoose['price'] = newValue;
                }
            }
            watch(shopClassify.priceValues,newValue=>{
                filterPrice(newValue)
            },{
                deep:true,
            })

            const sliderRight = (bool)=>{
                shopClassify.right = bool
                filterPrice(shopClassify.priceValues)
            }

            const handleClickClassify = (item)=>{
                if(item==='menu'){
                    popup_menu.value.open()
                    nextTick(()=>{
                        sliderRef.value.init()
                        setTimeout(()=>{
                            // shopClassify.min = 50
                            // shopClassify.priceValues = [50,100]
                        },1000)
                    })
                }
                emit('classify',item)
            }

            /**
             * @description: 
             * @param {*} item 选项
             * @param {*} single 单选
             * @return {*}
             */
            const handleChooseFilter = (single,parent,item)=>{
                !shopFilterChoose[parent.name]&&(shopFilterChoose[parent.name] = [])
                if(shopFilterChoose[parent.name].includes(item.label)){
                    shopFilterChoose[parent.name] = shopFilterChoose[parent.name].filter(fitem=>fitem!=item.label)
                }else{
                    shopFilterChoose[parent.name] = single?[item.label]:shopFilterChoose[parent.name].concat([item.label])
                }
            }
            


            const resetFilter = ()=>{
                sliderRef.value.reset();
                Object.keys(shopFilterChoose).map(key=>{delete shopFilterChoose[key]})
                
            }
            const submitFilter = ()=>{
                console.log(shopFilterChoose);
            }
            return {
                state,
                classifyStyle,
                marginTop,
                popup_menu,
                sliderRef,
                shopClassify,
                shopFilter,
                shopFilterChoose,
                shopFilterChooseLength,
                handleClickClassify,
                handleChooseFilter,
                sliderRight,
                resetFilter,
                submitFilter,
            };
        }
    }
</script>

<style lang="scss" scoped>
.shop_classify{
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.classifyStyle{
        background: #fff;
        .sc_item{
            background: $theme_bg !important;
        }
    }
}
.sc_list{
    width: 93%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 26rpx;
}
.sc_item{
    display: inline-block;
    padding: 10rpx;
    background: #fff;
    border-radius: 15rpx;
    &:not(:last-child){
        margin-right: 10rpx;
    }
}

.sc_menu_box{
    $mfooter_height:100rpx;
    height: 70vh;
    background: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    padding-bottom: $mfooter_height;
    overflow-y: auto;
    .sc_menu_footer{
        position: fixed;
        width: 100%;
        background: #fff;
        bottom: 0;
        left: 0;
        height:$mfooter_height ;
        display: flex;
        align-items: center;
        padding:10rpx 20rpx 20rpx 20rpx;
        box-sizing: border-box;
        justify-content: space-between;
        button{
            font-size: 30rpx;
            width: 48%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &.submit{
                background: linear-gradient(to right,$theme_color,$theme_color2);
            }
        }
    }
}
.sc_menu_title{
    color: rgba($color: #000000, $alpha: .65);
}

.sc_options_list{
    display: flex;
    flex-wrap: wrap;
    margin: 20rpx 0;
    .sc_option{
        width: calc(100% / 4);
        box-sizing: border-box;
        padding: 10rpx;
        font-size: 26rpx;

        &>view{
            background-color:rgba(0,0,0,.03);
            border-radius: 10rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10rpx;
            &.choose{
                background: rgba($color: #08A1DB, $alpha: .9);
                color: #fff;
            }
        }
    }
}





</style>