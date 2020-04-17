import axios from 'axios';
import {Notice, Message} from 'view-design';
import md5 from 'js-md5';

const axiosIns = axios.create({});
// req 拦截器
axiosIns.interceptors.request.use(req => {
	if (!req.url) {
		console.info('请检查，url为空：' + req.url);
	}
	//增加一层请求头的加密，防止被恶意获取数据
	let req_data = '';
	try {
		req_data = JSON.stringify(Object.assign({}, req.data || {}));
	} catch (e) {
		req_data = '';
	}
	req.headers['Designed-By-Sl'] = md5(req_data).substring(0, 16) + md5('shuli').substring(16, 32);
	//admin mange发起的请求才增加token
	// if((/^\/manage/.test(req.url))){}
	req.headers.token = localStorage.getItem('token') || '';
	req.headers.orgId = localStorage.getItem('orgId') || '';
	req.headers.uid = localStorage.getItem('userId') || '';
	req.headers.menuId = localStorage.getItem('menuId');//menuId，用于记录日志
	req.headers.pageId = localStorage.getItem('pageId');//pageId，用于记录日志
	return req;
}, err => {
	return Promise.reject(err.request);
});

// res 拦截器
axiosIns.interceptors.response.use(res => {
	if (res && res.data) {
		return Promise.resolve(res.data);
	}
	return res.data;
}, err => {
	return Promise.resolve(err.response);
});


export const axios_get = async (url, data = {}, msg = '接口异常', headers) => {
	return axiosIns.get(url, {params: data, ...headers})
		.then(res => {
			let iRes = res && res.config ? res.data : res;
			if ((iRes && iRes.code === 10000) || iRes.code === '10000') {
				return Promise.resolve(iRes || {});
			} else if (iRes.code === 20004) {
				Message.warning({
					content: iRes.message || "登录超时，请重新登录！",
					duration: 2,
					onClose: () => {
						location.href = '/login.html';
					}
				});
				return Promise.reject(iRes || {});
			} else {
				Notice.error({title: "提示", desc: iRes.message || "接口异常，请联系管理员！"});
				return Promise.resolve(iRes || {});
			}
		})
		.catch(err => {
			console.info(err.message || msg);
		});
};
export const axios_post = async (url, data = {}, msg = '接口异常', headers) => {
	return axiosIns.post(url, data, headers).then(res => {
		let iRes = res && res.config ? res.data : res;
		if ((iRes && iRes.code === 10000) || iRes.code === '10000') {
			return Promise.resolve(iRes);
		} else if (iRes.code === 20004) {
			Message.warning({
				content: iRes.message || "token失效，请重新登录！", duration: 2, onClose: () => {
					location.href = '/login.html';
				}
			});
			return Promise.reject(iRes);
		} else {
			Notice.error({title: "提示", desc: iRes.message || "接口异常，请联系管理员！"});
			return Promise.resolve(iRes);
		}
	}).catch(err => {
		console.info(err.message || msg);
	});
};
