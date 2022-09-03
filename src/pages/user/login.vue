<template>
	<view class="pages_root pages_bg user_login"
	:style="{backgroundImage:`url(${store.theme.BG_LOGIN})`}"
	:theme-vars="store.theme"
	>
		<uni-card :is-shadow="true">
			<user-form type="1" />
		</uni-card>
	</view>
</template>

<script>
	import {useStore} from '@/common/store/global'
	import { reactive } from 'vue'
	export default {
		
		setup(props) {
			const store = useStore()
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