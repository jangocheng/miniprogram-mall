/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://services.binarization.com/weapp/mall';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 购物车地址
        cartUrl: `${host}/cart`,

        // 评论地址
        commentUrl: `${host}/comment`,

        // 商品订单地址
        orderUrl: `${host}/orders`,

        // 商品详情地址
        itemUrl: `${host}/items`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/upload`
    }
};

module.exports = config;