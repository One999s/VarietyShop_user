/*
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 14:14:32
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 13:53:00
 * @FilePath: \varietyShop\frontend\users\src\common\store\global.js
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'

export const useStore = defineStore('global', {
  state: () => ({
	  user:{},
	  theme:{//主题
      // BG_LOGIN:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fbg_w1180%2F00%2F01%2F18%2FbBmlFl9UbM.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663313985&t=64d750358aeb716b5eb546d5febe9956",
      BG_LOGIN:"	https://pic.616pic.com/bg_w1180/00/06/34/vhuipmQ6fn.jpg!/fh/600"
      // buttonPrimaryBackgroundColor: '#07c160',
    },
    category:[],
  }),
  actions: {
    increment() {
      
    },
  },
  getters: {
      // doubleCount: (state) => state.counter * 2,
    },
}) 