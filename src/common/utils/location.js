/*
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-21 22:42:09
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-21 22:55:51
 * @FilePath: \varietyShop\frontend\users\src\common\utils\location.js
 * @Description: '
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
 */
class Location {
    isStartLocation = false;
    locationWaitTime = 60; // 等待时间
    locationGetTime = null; // 上次获取时间
    location = {};
    getLocation(type='gcj02', callback) {
        	return new Promise((resolve, reject) => {
			let diffTime = (new Date()-this.locationGetTime)/1000
			if(this.locationGetTime&&diffTime<this.locationWaitTime){
				return resolve(location)
			}
			uni.getLocation({
				type,
				success: res => {
					console.log("获取成功",res)
					this.locationGetTime = new Date();
                    this.location = res;
					resolve(res)
				},
				fail: (err) => {
					console.log("获取位置错误",err)
					this.getSetting((res)=>{
						resolve(res)
					},callback)

				}
			})
		})
    }

    getSetting(cb,callback) {
			uni.getSetting({
			success: res => {
				console.log('用户权限列表:', res.authSetting)
				if (res.authSetting['scope.userLocation']) {
					console.log('已授权userLocation')
					cb(true)
				} else {
                    this.openSetting(cb,callback) //点击确定引导客户开启定位
				}
			},
			fail: (err) => {
				console.log("获取设置错误",err)
				cb(false)
			}
		})
	}


    openSetting(callback, cb2) {
		uni.showModal({
			title: '提示',
			content: '请授权定位',
			duration: 3000,
			success: (res) => {
				if (res.confirm) {
					uni.openSetting({
						success: (res) => {
							if (!res.authSetting['scope.userLocation']) {
								callback && callback(false)
								uni.showToast({
									title: '您拒绝了授权，无法提供相关服务',
									icon: "none",
									duration: 3000,
								})
							} else {
								callback && callback(true)
								cb2 && cb2()
							}
						},
						fail: (err) => {
							console.log("打开设置失败", err)
						}
					})
				} else if (res.cancel) {
					callback && callback(false)
					uni.showToast({
						title: '您拒绝了授权，无法提供相关服务',
						duration: 3000,
						icon: "none"
					});
				}
			}
		});

	}
}

export default new Location();