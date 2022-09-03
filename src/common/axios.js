import axios from 'axios';

const instance = axios.create({
	// baseURL: "",
	timeout: 5000,
	headers: {},
	withCredentials: false, // 表示跨域请求时是否需要使用凭证
	// `responseType` 表示浏览器将要响应的数据类型
	// 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
	// 浏览器专属：'blob'
	responseType: 'json', // 默认值
	// auth: {// `auth` HTTP Basic Auth
	//     username: 'janedoe',
	//     password: 's00pers3cret'
	// },
	xsrfCookieName: 'XSRF-TOKEN', // 默认值
	xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

})


// 请求拦截器
instance.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		return Promise.reject(error)
	}
)




// 兼容小程序
instance.defaults.adapter = function (config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		var buildFullPath = require('axios/lib/core/buildFullPath');
		let fullurl = buildFullPath(config.baseURL, config.url)
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(fullurl, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}



export default instance
