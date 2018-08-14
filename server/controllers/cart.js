const DB = require('../utils/db');
module.exports = {
    /**
     * 添加到购物车列表
     */
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let item = ctx.request.body
        let list = await DB.query('SELECT * FROM cart_user WHERE cart_user.id = ? AND cart_user.user = ?', [item.id, user])
        if (!list.length) {
            // 商品还未添加到购物车
            await DB.query('INSERT INTO cart_user(id, count, user) VALUES (?, ?, ?)', [item.id, 1, user])
        } else {
            // 商品之前已经添加到购物车
            let count = list[0].count + 1
            await DB.query('UPDATE cart_user SET count = ? WHERE cart_user.id = ? AND cart_user.user = ?', [count, item.id, user])
        }
        ctx.state.data = {}
    },

    /**
     * 拉取购物车商品列表
     */
    list: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        ctx.state.data = await DB.query('SELECT * FROM cart_user LEFT JOIN item ON cart_user.id = item.id WHERE cart_user.user = ?', [user])
    }
} 