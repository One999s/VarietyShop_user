<!--
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-08-17 18:14:44
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 21:15:31
 * @FilePath: \varietyShop\frontend\users\src\pages\chat\index.vue
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
-->
<template>
	<view class="chat_index">
		<uni-nav-bar  left-text="消息" statusBar :border="false"
		fixed
		></uni-nav-bar>
		<view class="chat_main">
			<uni-list :border="true">
				<uni-swipe-action
				ref="swipe"
				>
					<uni-swipe-action-item
					v-for="(item,index) in list"
					:key="index"
					:right-options="options"
					@click="handleOptionClick"
					>
							<uni-list-chat 
								clickable
								@click="()=>handleToChat(item)"
								:title="item.shopName" 
								:avatar="item.shopAvatar" 
								:note="item.lastMsg" 
								:time="item.lastTime" 
								badge-positon="left"
								:badge-text="item.unread&&(item.unread>9?'dot':item.unread)" 
							></uni-list-chat>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</uni-list>

			<uni-load-more :status="status"></uni-load-more>

		</view>
	</view>
</template>

<script>
import { ref } from 'vue';
import uniSwipeActionItem from '../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import UniListItem from '../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue';

	export default{
  components: { uniSwipeActionItem, UniListItem },
		setup(){
			const list = ref([])
            const status = ref("loading")
			const swipe = ref(null); // 获取dom
			const options = [
				{
					text: '置顶',
					style: {
						backgroundColor: '#08A1DB'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]

			const getList = ()=>{
				setTimeout(()=>{
					list.value = Array.from(new Array(30),(v,k)=>({
						shopAvatar:'https://img2.baidu.com/it/u=772251462,959863533&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662310800&t=1b3581fa77193dcf3dcbc044200adbbe',
						shopName:'店铺'+k,
						unread:k*3,
						lastMsg:'最后一条信息',
						lastTime:'16:30'
					}))
					console.log(swipe.value.resize())
				})
			}

			const handleOptionClick = (e)=>{
				console.log(e)
				console.log(e.content.text)
			}
			const handleToChat = (row)=>{
				const {id} = row;
				uni.navigateTo({
					 url: `/pages/chat/chat?id=${id||''}`,
				});
			}
			getList()

			return {
				list,
				options,
				status,
				handleOptionClick,
				handleToChat,

				swipe,
			}
		}
	}
</script>

<style>
</style>