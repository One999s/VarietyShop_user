<template>
    <view class="page_order_confirm">
        <uni-nav-bar
        :border="false"
        statusBar
        fixed
        left-icon="back"
        title="确认订单"
        color="#fff"
        backgroundColor="#08A1DB"
        >
        </uni-nav-bar>
        <view class="poc_bg"></view>
        <view class="poc_main">
            <view class="poc_card poc_sh">
                <view>
                    <view>
                        <view class="address">地址</view>
                        <view class="poc_tips">姓名 131111111111</view>
                    </view>
                    <view>
                        <uni-icons type="right" color="#BCBCBC"/>
                    </view>
                </view>
                <view>
                    <view>支付方式</view>
                    <view>
                        <text class="pay_mode">微信</text>
                        <uni-icons type="right" color="#BCBCBC"/>
                    </view>
                </view>
            </view>
            
            <view class="order_list">
                <view
                v-for="(item,index) in orderList"
                :key="index"
                class="poc_card order_item"
                >
                    <view class="o_name">{{item.name}}</view>
                    <view>
                        <view>立即送出</view>
                        <view>
                            <text class="pay_mode">大约21:22送到</text>
                            <uni-icons type="right" color="#BCBCBC"/>
                        </view>
                    </view>
                    <view class="goods_list">
                        <view
                        v-for="(goods,gi) in item.goods"
                        :key="gi"
                        class="goods_item"
                        
                        >
                            <view>
                                <image :src="goods.imgSrc" mode="aspectFill"/>
                                <view class="goods_content">
                                    <view>
                                        <view class="o_name">{{goods.name}}</view>
                                        <view>￥<text class="g_price">{{gi}}</text></view>
                                    </view>
                                    <view class="poc_tips">{{goods.tags.join("/")}}</view>
                                    <view class="poc_tips">x{{goods.nums}}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view>包装费</view>
                        <view>￥<text class="g_price">1</text></view>
                    </view>
                    <view>
                        <view class="oc_row">
                            <image src="/static/icons/hb.png" class="img_icon" mode="aspectFill"/>
                            <view>红包/抵用券</view>
                        </view>
                        <view class="oc_choose">
                            <text class="notuse">无可用红包</text>
                            <uni-icons type="right" color="#BCBCBC" size="16"/>
                        </view>
                    </view>
                    <view>
                        <view class="oc_row">
                            <image src="/static/icons/dunpai.png" class="img_icon" mode="aspectFill"/>
                            <view>商家承诺</view>
                        </view>
                        <view class="oc_choose">
                            <text class="notuse">推荐开启号码保护，保护您的隐私</text>
                            <uni-icons type="right" color="#BCBCBC" size="16"/>
                        </view>
                    </view>
                    <view class="oc_br"></view>

                    <view>
                        <view class="">
                            <view>备注</view>
                        </view>
                        <view class="oc_choose">
                            <text class="notuse">请填写口味偏好</text>
                            <uni-icons type="right" color="#BCBCBC" size="16"/>
                        </view>
                    </view>
                    <view>
                        <view class="">
                            <view>餐具份数</view>
                        </view>
                        <view class="oc_choose">
                            <text class="notuse">必选</text>
                            <uni-icons type="right" color="#BCBCBC" size="16"/>
                        </view>
                    </view>
                    <view class="oc_shop_footer">
                        <view class="">
                            <view>优惠说明</view>
                        </view>
                        <view class="">
                           小计￥<text class="order_price">20</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="oc_footer">
            <view class="">
                合计￥<text class="order_price">20</text>
            </view>
            <view class="oc_submit">提交订单</view>
        </view>
    </view>
</template>

<script>
import { ref } from 'vue';

    export default{
        setup(){
            const orderList = ref([])
            orderList.value = Array.from(new Array(2),(v,k)=>({
                name:"店铺"+k,
                goods:Array.from(new Array(k+1),(v,k)=>({
                    name:"商品名称"+k,
                    imgSrc:"https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
                    nums:k,
                    tags:['少冰',"正常糖"],
                    price:k+5,
                }))
            }))
            return {
                orderList
            }
        }
    }
</script>

<style lang="scss" scoped>
    $orderItemFooter:80rpx;
    .page_order_confirm{
        position: relative;
        background: $theme_bg;
        font-size: 28rpx;
    }
    .poc_bg{
        position: fixed;
        top: 0;
        left: 0;
        height: 30vh;
        width: 100%;
		background-image: linear-gradient(to bottom,$theme_color 50%,$theme_color2,#fff);

    }
    .poc_main{
        position: relative;
        z-index: 2;
        padding:$space_padding;
        padding-bottom: 150rpx;
        overflow-y: auto;
    }
    .poc_card{
        background: #fff;
        border-radius: 20rpx;
        padding:$space_padding;
        position:relative;
        overflow: hidden;
        box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
        margin: 20rpx 0;
        &>view:not(.goods_list){
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 25rpx 0;
            &:first-child{margin-top: 0;}
            &:last-child{margin-bottom: 0;}
        }
    }
    .poc_sh{
        
    }
    .address{font-size: 36rpx;font-weight: bold;letter-spacing: 4rpx;margin-bottom: 10rpx;}
    .poc_tips{
        color: rgba($color: #a6a6a6, $alpha: 1);
        font-size: 23rpx;
    }
    .pay_mode{
        color: $theme_color;
        margin: 0 10rpx;
    }
    .order_item{
        font-size: 26rpx;
        padding-bottom: $orderItemFooter;
    }
    .o_name{font-weight: bold;font-size: 28rpx;}
    .goods_list{
        width: 100%;
        image{
            width:100rpx;height: 100rpx;
            border-radius: 15rpx;
        }
        
    }
    .goods_item{
        margin: 25rpx 0;
        &>view{
            display: flex;
        }
        .goods_content{
            flex:1;
            margin-left: 20rpx;
            &>view{
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .g_price{
            font-size: 30rpx;
        }

    .img_icon{
        width:30rpx;height: 30rpx;
        margin-right: 15rpx;
    }
    .oc_row{
        display: flex;
        align-items: center;
    }
    .oc_choose{
        font-size: 24rpx;
        display: flex;
        &>text{
            &.notuse{
                color: rgba($color: #a6a6a6, $alpha: 1);
            }
        }
    }
    .oc_br{
        width: 100%;
        height: 1px;
        background: rgba($color: #a6a6a6, $alpha: .2);
        transform:scaleY(.5);
    }
    .oc_shop_footer{
        height: $orderItemFooter;
        padding:$space_padding;
        color: rgba($color: #000, $alpha: .6);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba($color: rgb(244, 174, 99), $alpha: .3);
    }
    .order_price{
        font-weight: bold;
        font-size: 38rpx;
        color: #000;
    }

    .oc_footer{
        font-size: 26rpx;
        z-index: 99;
        background: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: $space_padding;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .oc_submit{
        font-size: 30rpx;
        padding: 10rpx 30rpx;
		background-image: linear-gradient(to right,$theme_color,$theme_color2);
        border-radius: 50rpx;
        color: #fff;
        margin-left: 20rpx;
    }
</style>