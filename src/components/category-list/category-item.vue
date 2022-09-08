<template>
    <view class="cate_item_box">
        <view class="cate_item_img">
            <image :src="item.imgSrc" mode="aspectFill"/>
        </view>
        <view class="cate_item_main">
            {{item.name}}
        </view>
    </view>
</template>

<script>
    export default {
        props:{
            item:{type:Object,default:()=>({})}
        },
        setup(props){
            const {item} = props;
            return {
                item
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cate_item_box{
        margin: 30rpx 15rpx;
        margin-left: 0;
        display: flex;
        .cate_item_img{
            width:160rpx;height: 160rpx;
            // background: #fcfcfcd4;
            background: red;
            border-radius: 10rpx;
            overflow: hidden;
            image{width:100%;height: 100%;}
        }
        .cate_item_main{
            padding-left: 10rpx;
            flex: 1;
        }
    }
</style>