<template >
    <view class="cus_search">
        <uni-easyinput :placeholder="placeholder" prefixIcon="search"  trim
        ConfirmType="search"
        >
            <template #right>
                <button size="mini">搜索</button>
            </template>
        </uni-easyinput>
    </view>
</template>

<script>


    export default{
        props:{
            placeholder:String,
            bgColor:String
        },
        setup(props){
            const {placeholder="请输入"} = props;
            return {
                placeholder,

            }
        }
    }
</script>

<style lang="scss" scoped>
</style>