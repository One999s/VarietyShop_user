<template>
    <view class="chat_box">
        <uni-nav-bar statusBar :border="false"
		fixed
		>
        <template v-slot:left>
            <view class="chat_nav_left">
                <uni-icons type="back" @click="goBack"/>
                <view>商家-{{shopDetai.name}}</view>
            </view>
        </template>
        <template v-slot:right>
            <view class="chat_nav_right">
                <view @click="handleCallPhone">
                    <uni-icons type="phone" size="20"/>
                    <text>电话</text>
                </view>
                <view @click="goToShop">
                    <uni-icons type="shop" size="20"/>
                    <text>店铺</text>
                </view>
            </view>
        </template>
    </uni-nav-bar>
    <view class="chat_list">
        <view
            v-for="(item,index) in chatList"
            :key="index"
            :class="{
                'chat_item':true,
                'chat_item_self':item.sender
            }"
        >
            <view v-if="index%5==0" class="chat_time_line">2022-09-02 16:32</view>
               <view class="chat_item_box">
                    <image
                        :src="imageURL(item.sender)"
                        class="chat_avatar"
                        ></image>
                    <view
                    :class="{
                        'chat_content':true,
                        'chat_content_self':item.sender,
                    }"
                    >{{item.content}}</view>
                    <view class="chat_type">
                        <uni-icons type="reload" class="type_err" :size="24" v-if="index%2"/>
                        <uni-icons type="spinner-cycle" class="type_loading" :size="24" v-else-if="index%3"/>
                        <view class="chat_type_text" v-else>已读</view>
                    </view>
               </view>
        </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="chat_tool">
        <view>
            <uni-icons :type="state.isMic?'compose':'mic'" :size="26"
            @click="handleChangeType"
            />
        </view>
        <view class="chat_tool_mid">
            <input v-if="!state.isMic"/>
            <button v-if="state.isMic" size="mini" @longpress="handleSpeak">按住说话</button>

        </view>
        <view>
            <uni-icons type="plusempty" :size="26" />
        </view>
    </view>
    </view>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from '../../common/store/global';
import uniIcons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
    export default {
  components: { uniIcons },
        props:{
            id:String,
        },
        setup(props){
            const {user} = useStore();
            const shopDetai = ref({});
            const chatList = ref([]);
            const state = reactive({
                isMic:true,// 发声音
            })
            const getShopDetail = ()=>{
                // 获取商家信息
                shopDetai.value = {
                    name:'店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺',
                    phone:'13111111111',
					avatar:'https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6',
                }
            }
            const getList = ()=>{
                chatList.value = Array.from(new Array(20),(v,k)=>({
                    content:"内容"+k,
                    sendTime:new Date(),
                    sender:k%2==0
                }))
            }
            const goToShop = ()=>{
                // 跳转商铺内页
            }
            const handleCallPhone = ()=>{
                // 拨打电话
                uni.makePhoneCall({
                    phoneNumber: shopDetai.phone 
                });
            }
            const goBack = ()=>{
                // 返回
                     uni.switchTab({
                            url: '/pages/chat/index'
                        });
            }
            const imageURL = (sender)=>{
                return sender?user.avatar:shopDetai.value.avatar
            }
            const handleChangeType = ()=>{
                state.isMic = !state.isMic
            }
            const handleSpeak = ()=>{
                console.log("handleSpeakhandleSpeak")
            }
            getShopDetail()
            getList()
            return {
                shopDetai,
                chatList,
                state,
                goToShop,
                handleCallPhone,
                goBack,
                imageURL,
                handleChangeType,
                handleSpeak,

            }
        }
    }
</script>

<style lang="scss" scoped>
    $chat_avatar_height:50rpx;
    $chat_tool_height:88rpx;
    .chat_box{
        background-color: $theme_bg;
        .chat_avatar{
            width:$chat_avatar_height;
            height: $chat_avatar_height;
            border-radius: 50%;
        }
    }
    .chat_nav_left{
        display: flex;
        align-items: center;
        font-size: 30rpx;
        width: 100%;
        &>view{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    .chat_nav_right{
        display: flex;
        align-items: center;
        
        &>view{
            display: flex;
            flex-direction: column;
            margin-left: $space;
        }
    }
    .chat_list{
        padding: $space;
        padding-bottom: $chat_tool_height;
        display: flex;
        flex-direction: column;
        flex-wrap:wrap;
    }
    .chat_item_box{
        width: calc(100% - $chat_avatar_height - 10rpx);
        display: flex;
    }
    .chat_item{
        width: 100%;
        display: flex;
        margin: calc($space / 2) 0;
        flex-direction: column;

    }
    .chat_time_line{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20rpx;
    }
    .chat_type{
        height: $chat_avatar_height;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chat_type_text,.chat_time_line{
        color: rgba($color: #000000, $alpha: .5);
    }
    .chat_item_self{
        .chat_item_box{
            justify-content: flex-end;
            align-self: flex-end;
        }
       
        .chat_avatar{order: 1;}
        .chat_type{
            order:-1;
        }
    }
    .chat_content{
        background: #fff;
        flex:1;
        border-radius: 10rpx;
        margin:0 20rpx;
        box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
        padding: 6rpx;
        &.chat_content_self{
            background: $theme_color;
            color:#fff;
        }
    }
    .chat_tool{
        position: fixed;
        z-index: 999;
        bottom: 0;
        left: 0;
        width:100%;
        height: $chat_tool_height;
        background: $theme_bg;
        display: flex;
        align-items: center;
        padding:0 $space_padding;
        border-bottom: 1px solid #fff;
        box-shadow: 3px 3px 16px #FEFEEF;
        .chat_tool_mid{
            flex:1;
            background: #fff;
            margin:0 $space_padding ;
            display: flex;
            align-items: center;
            button{
                flex:1;
                border: none;
                background: #fff;
                box-shadow: none;
                &::after{content: none;}
                border-radius: 10rpx;
            }

        }
    }
</style>
