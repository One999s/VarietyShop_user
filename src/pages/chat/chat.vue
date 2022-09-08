<template>
  <view
    :class="{
      chat_box: true,
    }"
  >
    <uni-nav-bar statusBar :border="false" fixed>
      <template v-slot:left>
        <view class="chat_nav_left">
          <uni-icons
            type="back"
            @click="goBack"
            style="margin-right: 0.5em"
            size="20"
          />

          <view class="flex" @click="goToShop">
            <uni-icons type="shop" size="24" />
            <view style="flex: 1">{{ shopDetai.name }}</view>
          </view>
        </view>
      </template>
    </uni-nav-bar>
    <view class="chat_list">
      <view
        v-for="(item, index) in chatList"
        :key="index"
        :class="{
          chat_item: true,
          chat_item_self: item.sender,
        }"
      >
        <view v-if="index % 5 == 0" class="chat_time_line"
          >2022-09-02 16:32</view
        >
        <view class="chat_item_box">
          <view class="chat_avatar">
            <image :src="(item.sender ? user.avatar : shopDetai.avatar)" class="chat_avatar"></image>
          </view>
          <view
            :class="{
              chat_content: true,
              chat_content_self: item.sender,
              chat_content_voice: item.voicePath,
            }"
            @click="() => (item.voicePath ? playVoice(item) : {})"
          >
            <view v-if="item.voicePath">8''</view>
            <uni-icons v-if="item.voicePath" type="sound" :size="24" style="margin-left:5%;"/>
            <text v-else>{{ item.content }}</text>
          </view>
          <view class="chat_type">
            <uni-icons
              type="reload"
              class="type_err"
              :size="24"
              v-if="index % 2"
            />
            <uni-icons
              type="spinner-cycle"
              class="type_loading"
              :size="24"
              v-else-if="index % 3"
            />
            <view class="chat_type_text" v-else>已读</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 录音 -->
    <view class="mic_box" v-if="state.visible_mic">
      <view class="mb_voice">
        <image src="/static/voice.gif" />
      </view>
      <view class="mb_tool">
        <view :class="{ close: true, leave: !state.mic_close_in }" id="mb_close"
          >X</view
        >
        <view></view>
      </view>
      <view
        id="mb_footer"
        :class="{ mb_footer: true, leave: !state.mic_ing_in }"
      >
        <uni-icons type="sound" size="30" />
      </view>
    </view>
    <!-- 底部操作栏 -->
    <view class="chat_tool">
      <view>
        <uni-icons
          :type="state.isMic ? 'compose' : 'mic'"
          :size="26"
          @click="handleChangeType"
        />
      </view>
      <view class="chat_tool_mid">
        <input v-if="!state.isMic" confirm-type="send" />
        <button
          v-show="state.isMic"
          size="mini"
          @longpress="handleSpeak"
          @touchmove.stop.prevent="touchmove"
          @touchend="touchend"
        >
          {{ state.visible_mic ? "松开发送" : "按住说话" }}
        </button>
      </view>
      <view class="chat_tool_right">
        <uni-icons type="plusempty" :size="26" />
        <uni-icons type="phone" :size="26" @click="handleCallPhone" />
      </view>
    </view>
  </view>
</template>

<script>
import { reactive, ref, getCurrentInstance, nextTick } from "vue";
import { useStore } from "../../common/store/global";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const { user } = useStore();
    const shopDetai = ref({});
    const chatList = ref([]);
    const instance = getCurrentInstance();
    const state = reactive({
      isMic: false, // 底部左侧图标切换
      visible_mic: false, // 录音
      mic_close: {}, // 元素
      mic_ing: {}, // 元素
      mic_ing_in: true, // 手指在语音范围
      mic_close_in: false, // 手指不在语音范围
      tempFilePath: null,
    });

    // #ifndef H5
    const recorderManager = uni.getRecorderManager(); // 录音管理器
    const innerAudioContext = uni.createInnerAudioContext();
    recorderManager.onStop((res) => {
      console.log("recorder stop" + JSON.stringify(res));
      state.tempFilePath = res.tempFilePath;
      handleSendVoice();
    });
    // #endif

    const getShopDetail = () => {
      // 获取商家信息
      shopDetai.value = {
        name: "店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺",
        phone: "13111111111",
        avatar:
          "https://img2.baidu.com/it/u=3096226424,2372933137&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662224400&t=e9de05d24c07a8b4365213f5962ff0a6",
      };
    };
    const getList = () => {
      chatList.value = Array.from(new Array(20), (v, k) => ({
        content: "内容" + k,
        sendTime: new Date(),
        sender: k % 2 == 0,
      }));
    };
    const goToShop = () => {
      // 跳转商铺内页
    };
    const handleCallPhone = () => {
      // 拨打电话
      uni.makePhoneCall({
        phoneNumber: shopDetai.value.phone,
      });
    };
    const goBack = () => {
      // 返回
      uni.switchTab({
        url: "/pages/chat/index",
      });
    };
    const resetMicTypes = () => {
      // 重置语音效果状态
      state.mic_close_in = false;
      state.mic_ing_in = true;
    };
    const handleChangeType = () => {
      // 文本、语音 切换
      state.isMic = !state.isMic;
    };
    const handleSpeak = () => {
      state.visible_mic = true;
      // 获取元素范围
      nextTick(() => {
        let query = uni.createSelectorQuery().in(instance);
        query
          .select("#mb_footer")
          .boundingClientRect((data) => {
            state.mic_ing = data;
          })
          .select("#mb_close")
          .boundingClientRect((data) => {
            state.mic_close = data;
          })
          .exec();
      });
      recorderManager.start(); // 开始录音
      console.log("handleSpeakhandleSpeak");
    };
    const touchmove = (e) => {
      let now = e.changedTouches[0];
      let { mic_ing } = state;
    console.log(`当前Y${now.pageY}--区域TOP${mic_ing.top}******当前X${now.pageX}--区域Right${mic_ing.right}`)
      if (now.pageY > mic_ing.top && now.pageX < mic_ing.right) {
        // 在语音范围内
        state.mic_ing_in = true;
        state.mic_close_in = false;
      } else {
        state.mic_ing_in = false;
        state.mic_close_in = true;
      }
    };
    const touchend = (e) => {
      state.visible_mic = false;
      recorderManager.stop();
    };

    /**
     * @description: 播放声音
     * @param {*} item
     * @return {*}
     */
    const playVoice = (item) => {
      console.log(item.voicePath);
      if (item.voicePath) {
        innerAudioContext.src = item.voicePath;
        innerAudioContext.play();
      }
    };

    const handleSendVoice = () => {
      if (state.mic_ing_in) {
        console.log("发送");
        // 发送语音
        chatList.value.push({
          sendTime: new Date(),
          content: null,
          sender: true,
          voicePath: state.tempFilePath,
        });
      }
      if (state.mic_close_in) {
        console.log("取消");
        // 清除录音
        state.tempFilePath = null;
      }

      resetMicTypes(); // 重置状态
    };

    getShopDetail();
    getList();
    return {
        user,
      shopDetai,
      chatList,
      state,
      goToShop,
      handleCallPhone,
      goBack,
      handleChangeType,
      handleSpeak,
      touchmove,
      touchend,
      playVoice,
    };
  },
};
</script>

<style lang="scss" scoped>
$chat_avatar_height: 50rpx;
$chat_tool_height: 88rpx;
$chat_avatar_margin: 10rpx;
.hidescroll {
  overflow: hidden !important;
}
.flex {
  display: flex;
  align-items: center;
}
.chat_box {
  background-color: $theme_bg;
  .chat_avatar {
    width: $chat_avatar_height;
    height: $chat_avatar_height;
    border-radius: 50%;
  }
}
.chat_nav_left {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  width: 100%;
  & view {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.chat_nav_right {
  display: flex;
  align-items: center;

  & > view {
    display: flex;
    flex-direction: column;
    margin-left: $space;
  }
}
.chat_list {
  padding: $space;
  padding-bottom: $chat_tool_height;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.chat_item_box {
  width: calc(100% - $chat_avatar_height - 10rpx);
  display: flex;
}
.chat_item {
  width: 100%;
  display: flex;
  margin: calc($space / 2) 0;
  flex-direction: column;
}
.chat_time_line {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20rpx;
}
.chat_type {
  height: $chat_avatar_height;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90rpx;
}
.chat_type_text,
.chat_time_line {
  color: rgba($color: #000000, $alpha: 0.5);
}
.chat_item_self {
  .chat_item_box {
    justify-content: flex-end;
    align-self: flex-end;
  }

  .chat_avatar {
    order: 1;
  }
  .chat_type {
    order: -1;
  }
}
.chat_content {
  background: #fff;
  // flex:1;
  border-radius: 10rpx;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
  padding: 6rpx;
  margin-left: 10rpx;
  &.chat_content_self {
    margin-left: 0;
    margin-right: 10rpx;
    background: $theme_color;
    color: #fff;
  }
  &.chat_content_voice{
    min-width: 30%;
    display: flex;
    justify-content: flex-end;
  }
}
.chat_tool {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $chat_tool_height;
  background: $theme_bg;
  display: flex;
  align-items: center;
  padding: 0 $space_padding;
  border-bottom: 1px solid #fff;
  box-shadow: 3px 3px 16px #fefeef;
  .chat_tool_mid {
    flex: 1;
    background: #fff;
    margin: 0 $space_padding;
    display: flex;
    align-items: center;
    position:relative;
    button {
      flex: 1;
      border: none;
      background: #fff;
      box-shadow: none;
      &::after {
        content: none;
      }
      border-radius: 10rpx;
    }
  }
  .chat_tool_right {
    display: flex;
    align-items: center;
    & > uni-icons:not(:first-child) {
      margin-left: 10rpx;
    }
  }
}

.mic_box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba($color: #000000, $alpha: 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .mb_voice {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 70rpx;
    transform: translate(-50%, -50%);
    display: flex;
    width: 60%;
    height: 100rpx;
    border-radius: $space;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient($theme_color, $theme_color2);
    image {
      width: 100%;
    }
  }
  .mb_tool {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30rpx;
    .close {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba($color: #000, $alpha: 0.6);
      color: rgba($color: #fff, $alpha: 0.8);
      position: relative;
      &:not(.leave) {
        background: rgba($color: rgb(232, 62, 62), $alpha: 0.6) !important;
        &::after {
          content: "松开取消";
          position: absolute;
          top: -50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%);
          font-size: 24rpx;
          color: rgba($color: #fff, $alpha: 0.8);
        }
      }
    }
  }
  .mb_footer {
    width: 100%;
    height: 180rpx;
    background-color: rgba($color: #fff, $alpha: 0.6);

    border-radius: 60% 60% 0 0 / 30% 30% 0 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: $space;
    position: relative;

    &:not(.leave)::after {
      content: "松开发送";
      position: absolute;
      top: -30%;
      left: 50%;
      transform: translate(-50%);
      font-size: 24rpx;
      color: rgba($color: #fff, $alpha: 0.8);
    }
  }
  .leave {
    background: rgba($color: #000, $alpha: 0.5);
  }
}
</style>
