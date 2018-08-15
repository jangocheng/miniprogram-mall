const DB = require('../utils/db')

module.exports = {
    /**
    * 添加评论
    */
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let username = ctx.state.$wxInfo.userinfo.nickName
        let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
        let orderId = +ctx.request.body.orderId
        let itemId = +ctx.request.body.itemId
        let content = ctx.request.body.content || null
        if (!isNaN(itemId)) {
            await DB.query('INSERT INTO comment(user, username, avatar, content, item_id) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, content, itemId])
            // 更新订单的评论状态为 true(1)，默认 false
            let commented = 1
            await DB.query('UPDATE order_item SET commented = ? WHERE order_item.order_id = ? AND order_item.item_id = ?;', [commented, orderId, itemId])
        }
        ctx.state.data = {}
    },

    /**
     * 获取评论列表
     */
    list: async ctx => {
        let itemId = +ctx.request.query.itemId
        if (!isNaN(itemId)) {
            ctx.state.data = await DB.query('select * from comment where comment.item_id = ?', [itemId])
        } else {
            ctx.state.data = []
        }
    },
} 