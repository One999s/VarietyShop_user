<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-02 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 13:42:23
 * @FilePath: \varietyShop\frontend\users\src\pages\user\forget.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved. 
-->
<template>
	<view class="pages_root pages_bg user_login"
	:style="{backgroundImage:`url(${store.theme.BG_LOGIN})`}"
	:theme-vars="store.theme"
	>
		<uni-card :is-shadow="true">
			<user-form type="2"/>
		</uni-card>
	</view>
</template>

<script>
	import {useStore} from '@/common/store/global'
	export default {
		setup(props) {
			const store = useStore();
			const handleSubmit = (e,form) => {
				console.log(e,form)
			}
			return {
				store,
				handleSubmit,
			}
		}
	}
</script>

<style scoped lang="scss">
.user_login{
	display:flex;
	justify-content: center;
	align-items: center;
}
</style>