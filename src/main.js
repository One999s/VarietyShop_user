/*
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 13:41:52
 * @FilePath: \varietyShop\frontend\users\src\main.js
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
 */
import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import router from "./common/router";
import { createPinia } from 'pinia';
export function createApp() {
	const app = createSSRApp(App);
	app.use(router)
	app.use(createPinia())
	return {
		app,
	};
}
