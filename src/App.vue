<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-28 19:51:09
 * @FilePath: \varietyShop\frontend\users\src\App.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<script>
import { useStore } from "./common/store/global";
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    setTimeout(() => {
      this.getGlobal();
    }, 500);
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    getGlobal() {
      const state = useStore();
      let category = Array.from(new Array(35), (v, k) => ({
        icon: "/static/icons/ice.png",
        label: "饮品" + k,
      }));
      category = category
        .map((item, index) =>
          index % 3 == 0 ? category.slice(index, index + 3) : null
        )
        .filter((item) => item);
      state.$patch({
        category,
      });
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./static/cus_icon/del.css";
view,
text,
image,
img,
button,cover-view {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
page,
page > view,
uni-page-body,
uni-page-body > view {
  width: 100%;
  height: 100%;
  background: #fefefe;
}


::-webkit-scrollbar{
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}



.hidescroll{overflow: hidden;}



// uni-page-body > view {
//   padding: 1;
// }
.pages_bg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.cus_card {
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
  border-radius: 15rpx;
}
.uni-popup{z-index: 99999 !important;}
.ubox_top .uni-icons {
  color: rgba(0, 0, 0, 0.5) !important;
}
.cim_add .uni-icons {
  color: #fff !important;
}

.uni-card {
  border-radius: $border-radius !important;
}
.theme_icon .uni-icons {
    color: $theme_color !important;
}

.bt_radius {
  border-radius: 50rpx;
}

.user_form {
  .uni-forms-item {
    background-color: $bg_input;
    padding: 15rpx;
    border-radius: $border-radius;
  }
  .uni-icons {
    margin-right: 10rpx;
    font-size: 50rpx !important;
  }
}
.ae_form_box{
  .uni-forms-item:last-child{
     width: 50% !important;
   }
}

.uni-easyinput__content {
  background-color: transparent !important;
}
view.clearFormLabel{
  .uni-forms-item__label {
    display: none !important;
  }
}
.uni-easyinput__placeholder-class {
  font-size: 14px !important;
}
.uni-navbar--fixed{
  z-index: 9999 !important;
}
.nav_bar_transparent {
  uni-nav-bar,
  .uni-navbar,
  .uni-navbar__header,
  .uni-navbar__content {
    background-color: transparent !important;
  }
}

.search_box .uni-searchbar__box {
  border: 1px solid $theme_color;
  justify-content: flex-start !important;
}


.shop_list_wrapper {
  .uni-list {
    background-color: transparent !important;
    .uni-list-item {
      margin: 10rpx 0;
      border-radius: $space;
    }
    .uni-list-item__container {
      padding-left: 0 !important;
      padding: $space_padding !important;
    }
  }
  .uni-badge--x,
  uni-badge {
    width: 100%;
    flex: 1;
  }
}
.uni-badge {
  z-index: 9 !important;
}

.user_index {
  .uni-navbar {
    background-image: linear-gradient(
      to right,
      $theme_color,
      $theme_color2
    ) !important;
  }
}

.chat_box,.page_order{
  .uni-navbar__header-container {
    display: none !important;
  }
  .uni-navbar__header-btns-left {
    flex: 0.85 !important;
  }
  .type_err {
    color: $theme_color_im !important;
  }
}
.page_search{
  .uni-navbar__header-btns-left {
    display: none !important;
  }
  .uni-navbar__header-btns-right{
    width: 170rpx !important;
  }
}

.chat_content {
  .uni-icons {
    color: #fff !important;
  }
}
.nav_icons_white {
  .uni-icons {
    color: #fff !important;
  }
}

.shops_store .uni-navbar__header-btns {
  width: 60rpx !important;
}
.shops_store .uni-navbar__header-btns-right {
  width: 150rpx !important;
}

.icon_im {
  color: $theme_color_im;
  .uni-icons {
    color: $theme_color_im !important;
  }
}

.scrollMain {
  .uni-navbar__header-btns-left {
    display: none !important;
  }
  uni-nav-bar,
  .uni-navbar,
  .uni-navbar__header,
  .uni-navbar__content {
    background-color: #fff !important;
    transition: all 0.5s;
  }
}
// #ifdef H5
.si_main,
.chat_main {
  padding-bottom: var(--window-bottom) !important;
}
.shops_store .uni-navbar__header-btns-right {
  display: none !important;
}
// #endif




.page_scar{

checkbox .wx-checkbox-input,
checkbox .uni-checkbox-input {
	border-radius: 50% !important;
}
checkbox[checked] .wx-checkbox-input,
checkbox.checked .uni-checkbox-input{
	background:linear-gradient(to right,#08A1DB,#25D9B6) !important;
	border-color: #08A1DB !important;
	color: #ffffff !important;
}
}

</style>
