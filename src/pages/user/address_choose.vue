<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-22 15:47:59
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-22 17:27:00
 * @FilePath: \varietyShop\frontend\users\src\pages\user\address_choose.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view class="page_ac">
    <uni-nav-bar
      :border="false"
      statusBar
      fixed
      left-icon="back"
      title="确认收货地址"
      id="ac_nav"
    >
    </uni-nav-bar>
    <view class="ac_main">
      <view class="ac_top">
        <view class="ac_t_choose">
          <text>泉州市</text>
          <uni-icons type="bottom" size="20" />
        </view>
        <view class="ac_search_ip">
          <uni-easyinput
            placeholder="请输入你的收货地址"
            :inputBorder="false"
            @focus="() => changeTopShow(true)"
            @blur="() => changeTopShow(false)"
          />
        </view>
        <view class="ac_cancel" v-if="showCancel"> 取消 </view>
      </view>

      <map
        class="ac_map"
        :latitude="addressObj.latitude"
        :longitude="addressObj.longitude"
        :markers="covers"
      >
      </map>

      <scroll-view scroll-y class="ac_list">
        <view v-for="(item, index) in addressList" :key="index" class="ac_item"
        @click="()=>handleChooseAddress(item)"
        >
          <view class="item_left">
            <view class="ac_icon">
              <uni-icons
                type="location"
                size="26"
                :color="index === 0 ? '#08A1DB' : '#000'"
              />
            </view>
            <view
              :style="{
                color: index === 0 ? '#08A1DB' : '#000',
              }"
            >
              <view class="text_wrap">{{ item.title }}</view>
              <view class="text_wrap address_d">{{ item.address }}</view>
            </view>
          </view>
          <view>
            <view class="address_d">{{ item._distance }}m</view>
          </view>
        </view>
      </scroll-view>

      <cover-view class="ac_search_box"
      v-show="showCancel"
      :style="{
        height:`calc(100% - ${diffHeight})`
      }"
      >
      <cover-view  class="ac_list_cover">
            <cover-view v-for="(item, index) in addressList" :key="index" class="ac_item"
            @click="()=>handleChooseSearch(item)"
            >
            <cover-view class="flex_ac item_left">
                <cover-view class="ac_icon">
                <uni-icons
                    type="location"
                    size="26"
                />
                </cover-view>
                <cover-view
                >
                <cover-view class="text_wrap">{{ item.title }}</cover-view>
                <cover-view class="text_wrap address_d">{{ item.address }}</cover-view>
                </cover-view>
            </cover-view>
            <cover-view class="flex_ac">
                <cover-view class="address_d">{{ item._distance }}m</cover-view>
            </cover-view>
            </cover-view>
        </cover-view>
      </cover-view>
    </view>
  </view>
</template>

<script>
import { onLoad } from "@dcloudio/uni-app";
import { getCurrentInstance, nextTick, ref } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const backURL = ref(null);
    const diffHeight = ref(0);
    const covers = ref([]);
    const addressList = ref([
      {
        id: "801862430361643199",
        title: "泉州信息工程学院",
        address: "福建省泉州市丰泽区博东路249号",
        tel: "0595-22767537;0595-22789708",
        category: "教育学校:大学",
        type: 0,
        location: {
          lat: 24.942463,
          lng: 118.583887,
        },
        _distance: 12022.01,
        ad_info: {
          adcode: 350503,
          province: "福建省",
          city: "泉州市",
          district: "丰泽区",
        },
      },
      {
        id: "16171059256839305304",
        title: "泉州信息工程学院十三栋",
        address: "福建省泉州市丰泽区庄严路",
        tel: "",
        category: "房产小区:房产小区附属",
        type: 0,
        location: {
          lat: 24.946746,
          lng: 118.579865,
        },
        _distance: 12638.78,
        ad_info: {
          adcode: 350503,
          province: "福建省",
          city: "泉州市",
          district: "丰泽区",
        },
      },
      {
        id: "12360609981556119064",
        title: "泉州信息工程学院宗秀楼",
        address: "福建省泉州市丰泽区宏旗路与博后路交叉口北440米",
        tel: "",
        category: "教育学校:教育学校附属",
        type: 0,
        location: {
          lat: 24.942136,
          lng: 118.57982,
        },
        _distance: 12319.53,
        ad_info: {
          adcode: 350503,
          province: "福建省",
          city: "泉州市",
          district: "丰泽区",
        },
      },
      {
        id: "14747663886278342587",
        title: "泉州信息工程学院图书馆",
        address: "福建省泉州市丰泽区博东路249号泉州信息工程学院",
        tel: "",
        category: "购物:图书音像",
        type: 0,
        location: {
          lat: 24.94158,
          lng: 118.58378,
        },
        _distance: 11968.23,
        ad_info: {
          adcode: 350503,
          province: "福建省",
          city: "泉州市",
          district: "丰泽区",
        },
      },
      {
        id: "15924712829725677891",
        title: "泉州信息工程学院第三餐厅",
        address: "福建省泉州市丰泽区泉州信息工程学院10-11号宿舍楼西北侧",
        tel: "",
        category: "美食:中餐厅:其它中餐厅",
        type: 0,
        location: {
          lat: 24.946645,
          lng: 118.581458,
        },
        _distance: 12508.45,
        ad_info: {
          adcode: 350503,
          province: "福建省",
          city: "泉州市",
          district: "丰泽区",
        },
      },
    ]);
    addressList.value = addressList.value.concat(addressList.value);
    onLoad((params) => {
      if (params.backURL) {
        backURL.value = decodeURIComponent(params.backURL);
      }
    });
    const showCancel = ref(false);
    const addressObj = ref({
      latitude: 24.87389,
      longitude: 118.67587,
    });
    const changeTopShow = (bool) => {
      showCancel.value = bool;
    };
    /**
     * @description: 地址选择
     * @param {*} item
     * @return {*}
     */
    const handleChooseAddress = (item)=>{
        console.log(item);

    }
    const handleChooseSearch = (item)=>{
        addressObj.value = {
            ...addressObj.value,
            latitude:item.location.lat,
            longitude:item.location.lng,
        }
        showCancel.value = false;
    }
    nextTick(()=>{
        let query = uni.createSelectorQuery().in(instance);
          query
            // .selectAll("#ac_nav")
            // .boundingClientRect((data) => {
            //     diffHeight.value+=data.height
            // }) 
            .select(".ac_top")
            .boundingClientRect((data) => {
                diffHeight.value=(data.height+data.top)+'px'
            })
            .exec();
    })
    
    return {
      showCancel,
      addressObj,
      addressList,
      diffHeight,
      covers,
      changeTopShow,
      handleChooseAddress,  
      handleChooseSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.page_ac,
.ac_main {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
}
.ac_map {
  width: 100%;
  flex: 1;
}
.ac_top {
  display: flex;
  align-items: center;
  padding: $space_padding;
  & > view {
    display: flex;
    align-items: center;
  }
  .ac_search_ip {
    flex: 1;
    margin: 0 30rpx;
    background: #e6e6e6;
    border-radius: 40rpx;
    overflow: hidden;
  }
}
.ac_t_choose {
  text {
    margin-right: 20rpx;
    font-size: 28rpx;
  }
}

.ac_cancel {
  z-index: 999;
}
.address_d {
  color: rgba($color: #000000, $alpha: 0.5);
  font-size: 24rpx;
}
.ac_list {
  height: 600rpx;
}
.ac_icon {
  padding: 10rpx;
}
.ac_item {
  display: flex;
  align-items: center;
  padding: $space_padding;
  font-size: 26rpx;
  justify-content: space-between;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  & > view
  {
    display: flex;
    align-items: center;
  }
}

.ac_search_box{
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #fff;
}

.ac_list_cover{
    height: 100%;
    overflow-y: auto;
    .flex_ac
    {
        display: flex;
        align-items: center;
    }
}
.text_wrap{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
}

.item_left{
    flex:1;
}
</style>
