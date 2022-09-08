<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-06 14:31:21
 * @FilePath: \varietyShop\frontend\users\src\App.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<script>
import { useStore } from './common/store/global';
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    setTimeout(()=>{
      this.getGlobal()
    },500)
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    getGlobal(){
      const state = useStore()
      let category = Array.from(new Array(35),(v,k)=>({
            icon:'/static/icons/ice.png',
            label:'饮品'+k
        }))
      category = category.map((item,index)=>(index%3==0?category.slice(index,index+3):null)).filter(item=>item)
      state.$patch({
        category
      })
      
    }
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
view,text,image, img, button{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
page,page > view,
uni-page-body,
uni-page-body > view {
  width: 100%;
  height: 100%;
  background: #fefefe;
}
uni-page-body > view {
  padding: 1;
}
.pages_bg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.cus_card{
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
  border-radius: 15rpx;
}

.ubox_top .uni-icons{
  color: rgba(0,0,0,.5) !important;
}

.uni-card {
  border-radius: $border-radius !important;
}
.uni-icons {
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

.uni-easyinput__content {background-color: transparent !important;}
.uni-forms-item__label{display: none !important;}
.uni-easyinput__placeholder-class{font-size: 14px !important;}
.nav_bar_transparent{
  uni-nav-bar,.uni-navbar,.uni-navbar__header,.uni-navbar__content{
    background-color: transparent !important;;
  }
}

.search_box .uni-searchbar__box{
  border: 1px solid $theme_color;
  justify-content: flex-start !important;

}
.cus_search{
  .uni-easyinput__content-input,input{
    height: unset !important;
  }
  .is-input-border{
    border-color: $theme_color !important;
    border-radius: $space !important;
    &>view{
      display: flex;
    }
  }
  button,uni-button{
    background: linear-gradient(to right, $theme_color,$theme_color2);
    border-radius: $space !important;
    color: #fff;
    &::after{
      content: none;
      
    }
  }
}

.shop_list_wrapper{
  .uni-list{
    background-color: transparent !important;
    .uni-list-item{
      margin: 10rpx 0;
      border-radius: $space;
    }
    .uni-list-item__container{
      padding-left: 0 !important;
      padding: $space_padding !important;
    }
  }
  .uni-badge--x,uni-badge{width: 100%;flex:1;}
}
.uni-badge{z-index: 9 !important;}

.user_index{
  .uni-navbar{
		background-image: linear-gradient(to right,$theme_color,$theme_color2) !important;
  }
} 

.chat_box{
  .uni-navbar__header-container{display: none !important;}
  .uni-navbar__header-btns-left{flex:.85 !important;}
  .type_err{color: $theme_color_im !important;}
}
.chat_content {
  .uni-icons{color:#fff !important}
}
.nav_icons_white{
  .uni-icons{color:#fff !important}
}

.shops_store .uni-navbar__header-btns{width: 60rpx !important;}
.shops_store .uni-navbar__header-btns-right{width: 150rpx !important;}

.icon_im{
  color: $theme_color_im;
  .uni-icons{color:$theme_color_im !important}
}

.scrollMain{
	.uni-navbar__header-btns-left{
		display: none !important;
	}
  uni-nav-bar,.uni-navbar,.uni-navbar__header,.uni-navbar__content{
    background-color: #fff !important;
    transition: all .5s;

  }
}
// #ifdef H5
.si_main,.chat_main{padding-bottom: var(--window-bottom) !important;}
.shops_store .uni-navbar__header-btns-right{
  display: none !important;
}
// #endif
</style>