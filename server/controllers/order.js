const DB = require('../utils/db.js')
module.exports = {
    /**
     * 创建订单
     */
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let items = ctx.request.body.list || []
        let isInstantBuy = !!ctx.request.body.isInstantBuy
        // 插入订单至 order_user 表
        let order = await DB.query('INSERT INTO order_user(user) VALUES (?)', [user])
        // 插入订单至 order_item 表
        let orderId = order.insertId
        let sql = 'INSERT INTO order_item (order_id, item_id, count) VALUES '
        // 插入时所需要的数据和参数
        let query = []
        let param = []
        // 从购物车删除时所需要的数据和参数
        let pendingDeleteQuery = []
        let pendingDeleteId = []
        items.forEach(item => {
            query.push('(?, ?, ?)')
            param.push(orderId)
            param.push(item.id)
            param.push(item.count || 1)
            pendingDeleteQuery.push('?')
            pendingDeleteId.push(item.id)
        })
        await DB.query(sql + query.join(', '), param)
        if (!isInstantBuy) {
            // 非立即购买，购物车旧数据全部删除，此处本应使用事务实现，此处简化了
            await DB.query('DELETE FROM cart_user WHERE cart_user.id IN (' + pendingDeleteQuery.join(', ') + ') AND cart_user.user = ?', [...pendingDeleteId, user])
        }
        ctx.state.data = {}
    },

    /**
     * 获取已购买订单列表
     */
    list: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let list = await DB.query('SELECT order_user.id AS `id`, order_user.user AS `user`, order_user.create_time AS `create_time`, order_item.item_id AS `item_id`, order_item.count AS `count`, item.title AS `title`, item.image AS `image`, item.price AS `price` FROM order_user LEFT JOIN order_item ON order_user.id = order_item.order_id LEFT JOIN item ON order_item.item_id = item.id WHERE order_user.user = ? ORDER BY order_item.order_id', [user])
        // 将数据库返回的数据组装成页面呈现所需的格式
        let ret = []
        let cacheMap = {}
        let block = []
        let id = 0
        list.forEach(order => {
            if (!cacheMap[order.id]) {
                block = []
                ret.push({
                    id: ++id,
                    list: block
                })
                cacheMap[order.id] = true
            }
            block.push(order)
        })
        ctx.state.data = ret
    }
}