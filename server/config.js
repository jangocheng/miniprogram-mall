const ENV = process.env
const CONF = {
    port: ENV.EXPOSE_PORT || '5757',
    rootPathname: ENV.ROOT_PATH || '',

    // 微信小程序 App ID
    appId: ENV.APP_ID,

    // 微信小程序 App Secret
    appSecret: ENV.APP_SECRET,

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: ENV.DB_HOST || 'localhost',
        port: ENV.DB_PORT || 3306,
        user: ENV.DB_USER || 'root',
        db:   ENV.DB_NAME || 'cAuth',
        pass: ENV.DB_PSWD || '',
        char: ENV.DB_CHAR || 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: ENV.COS_REGION || 'ap-guangzhou',
        // Bucket 名称
        fileBucket: ENV.COS_BUCKET || 'qcloudtest',
        // 文件夹
        uploadFolder: ENV.COS_FOLDER || ''
    },

    // 微信登录态有效期
    wxLoginExpires: ENV.WX_LOGIN_EXPIRES || 7200,
    wxMessageToken: ENV.WX_MESSAGE_TOKEN || 'abcdefgh',

    /**
     * 其他配置: 用于自行搭建小程序服务
     */
    // 自定义服务器域名
    serverHost: ENV.SERVER_NAME || 'example.com',
    // 腾讯云 Tunnel
    tunnelServerUrl: ENV.TUNNEL || 'https://tunnel.ws.qcloud.la',
    // 自定义签名钥匙
    tunnelSignatureKey: ENV.TUNNEL_KEY || '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云账号的APPID
    qcloudAppId: ENV.QCLOUD_APP_ID || '',
    // 腾讯云相关配置可以查看云 API 秘钥控制台
    // https://console.cloud.tencent.com/capi
    qcloudSecretId: ENV.QCLOUD_SECRET_ID || '',
    qcloudSecretKey: ENV.QCLOUD_SECRET_KEY || '',
    networkTimeout: 30000
}

module.exports = CONF