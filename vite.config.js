/*
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:11:27
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-01 22:01:34
 * @FilePath: \varietyShop\frontend\users\vite.config.js
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  build:{
  }
})
