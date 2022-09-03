/*
 * @Author: one9s 9665730@qq.com
 * @Date: 2022-09-03 13:41:22
 * @LastEditors: one9s 9665730@qq.com
 * @LastEditTime: 2022-09-03 13:41:22
 * @FilePath: \varietyShop\frontend\users\src\common\router.js
 * @Description: 路由守卫
 * Copyright (c) 2022 by one9s 9665730@qq.com, All Rights Reserved.
 */


import { createRouter } from '@gowiny/uni-router'
import PAGE_DATA from '../pages.json';
import {checkLogin} from './auth';
const router = createRouter({
    pageData:PAGE_DATA
})


router.beforeEach((to,from)=>{
    console.log('beforeEach',to,from)
	if(to.path != '/pages/user/login' && !checkLogin()){
        return {
            to:{path:'/pages/user/login',url:to.fullPath},
            navType:'replaceAll'
        }
        //如果返回的是Promise，则会等待执行完成才进行下一步
        // return new Promise<BeforeEachResult>((success:any,fail)=>{
        //         console.log('beforeEach 2 end')
        //         success({
        //             to:{path:'/pages/user/login'},
        //             navType:'replaceAll'
        //         })
        // })
    }
})


// router.afterEach((to,from)=>{
//     console.log('afterEach,',to,from)
// })

export default router