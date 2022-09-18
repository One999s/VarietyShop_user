<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-16 23:20:15
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-18 10:51:02
 * @FilePath: \varietyShop\frontend\users\src\components\slider-bothway\slider-bothway.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
  <view
    class="slider_bothway"
    id="slider_bothway"
    :style="{
      background: bgColor,
    }"
  >
    <view
      class="slider_active_bg"
      :style="{
        'padding-left': state.left_x + barHeight / 2 + 'px',
        'padding-right': state.right_x + barHeight / 2 + 'px',
      }"
    >
      <view :style="{ background: activeBgColor }"></view>
    </view>
    <view
      class="slider_left"
      @touchmove.stop.prevent="touchmoveLeft"
      :style="{
        transform: `translateX(${state.left_x}px)`,
      }"
    >
      <view class="slider_tips"> ￥{{ value[0] }} </view>
      <view
        :style="{
          width: barHeight + 'px',
          height: barHeight + 'px',
        }"
        class="slider_slot_left"
      >
        <slot name="left">丨</slot>
      </view>
    </view>
    <view
      class="slider_right"
      @touchmove.stop.prevent="touchmoveRight"
      :style="{
        transform: `translateX(${-state.right_x}px)`,
      }"
    >
      <view class="slider_tips">
        ￥{{ value[1] }}
        <text v-if="state.right_x === 0">+</text>
      </view>
      <view
        :style="{
          width: barHeight + 'px',
          height: barHeight + 'px',
        }"
        class="slider_slot_right"
      >
        <slot name="right">丨</slot>
      </view>
    </view>
  </view>
</template>

<script>
import { computed, getCurrentInstance, nextTick, reactive, ref, toRefs, watch } from "vue";

export default {
    props:{
        modelValue: {type: Array,default: ()=>([0,100]),},
        min:{type:Number,default:0},
        max:{type:Number,default:100},
        step:{type:Number,default:2},
        barHeight:{type:Number,default:25},
        bgColor:{type:String,default:"#c6c6c6"},
        activeBgColor:{type:String,default:"linear-gradient(to right,#08A1DB,#25D9B6)"},
    },
  setup(props,{emit}) {
    const instance = getCurrentInstance();
    const sliderBothway = ref(null);

    const state = reactive({
      left_x: 0,
      right_x: 0,
    });
    const {
        min,max,bgColor,activeBgColor,step,barHeight
    } = toRefs(props);
    const value = computed(()=>props.modelValue);
    watch(value,(newValue)=>{
        emit('update:modelValue',newValue)
    },{
        deep:true
    })

    const trueWidth = computed(()=>{
        return (sliderBothway.value.width - barHeight.value * 2)
    })
    const distanceStep = computed(()=>{
        return (trueWidth.value / (max.value-min.value))*step.value
    })

    const touchmoveLeft = (e) => {
      let pageX = e.changedTouches[0].pageX - barHeight.value;
      let rightX = trueWidth.value - state.right_x - distanceStep.value;
      if (pageX > rightX) {
        // 碰撞右滑块
        pageX = rightX;
      }
      pageX = pageX < 0 ? 0 : pageX;
      let val =
        (pageX / trueWidth.value) *
        (max.value - min.value);
      let result = Math.round(val);
      if (!(result % step.value) && result < value.value[1]) {
        // 能余尽步进 并小于右滑块
        value.value[0] = result+min.value;
      };
      state.left_x =
        (result  / (max.value - min.value)) * trueWidth.value;


    };
    const touchmoveRight = (e) => {
      let pageX = e.changedTouches[0].pageX;
      if (pageX < state.left_x + barHeight.value * 2 + distanceStep.value) {
        // 碰撞左滑块
        pageX = state.left_x + barHeight.value * 2  + distanceStep.value;
      }
      pageX =
        pageX > sliderBothway.value.width
          ? 0
          : sliderBothway.value.width - pageX;

      let val =
        (pageX / trueWidth.value) *
        (max.value - min.value);
      let result = Math.round(val);
      if (!(result % step.value) && max.value - result > value.value[0]) {
        // 能余尽步进 并大于左滑块
        value.value[1] = max.value - result;
      }
      state.right_x =
        (result  / (max.value - min.value)) * trueWidth.value;

      emit('right',state.right_x===0)

    };

    const init = ()=>{
        // 获取容器宽度等信息
        // 在popup之类的 父组件被display none或者还没渲染的情况会获取不到元素信息，需手动ref调用init更新
      let query = uni.createSelectorQuery().in(instance);
      query
        .select("#slider_bothway")
        .boundingClientRect((data) => {
          sliderBothway.value = data;
        })
        .exec();
    }

    const reset = ()=>{
      // 重置
      value.value[0]=min.value
      value.value[1]=max.value
      state.left_x = 0;
      state.right_x = 0;
      emit('right',state.right_x===0)

    }

    nextTick(()=>{
        init();
    })
    return {
      state,
      value,
      sliderBothway,
      touchmoveLeft,
      touchmoveRight,
      init,
      reset,
      min,max,bgColor,activeBgColor,step,barHeight
    };
  },
};
</script>

<style lang="scss" scoped>
.slider_bothway {
  z-index: 99999;
  margin: 120rpx 0 80rpx 0;
  width: 100%;
  height: 10rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50rpx;
  .slider_active_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    & > view {
      width: 100%;
      height: 100%;
    }
  }
}
.slider_left,
.slider_right {
  background: #fff;
  border-radius: 50%;
  position: relative;
  border: 2px solid #08A1DB;
  position: relative;
//   &::after{
//     content: " ";
//     position: absolute;
//     width: 100%;
//     height: 10rpx;
//     background: #08A1DB;
//   }
  .slider_slot_right,.slider_slot_left{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slider_tips {
    position: absolute;
    top: -150%;
    left: 45%;
    transform: translateX(-55%);
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #dd524d;
  }
}
</style>
