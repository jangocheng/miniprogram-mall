const DB = require('../utils/db.js')
module.exports = {
    /**
     * 创建订单
     */
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let items = ctx.request.body.list || []
        // 插入订单至 order_user 表
        let order = await DB.query('INSERT INTO order_user(user) VALUES (?)', [user])
        // 插入订单至 order_item 表
        let orderId = order.insertId
        let sql = 'INSERT INTO order_item (order_id, item_id, count) VALUES '
        // 插入时所需要的数据和参数
        let query = []
        let param = []
        items.forEach(item => {
            query.push('(?, ?, ?)')
            param.push(orderId)
            param.push(item.id)
            param.push(item.count || 1)
        })
        await DB.query(sql + query.join(', '), param)
        ctx.state.data = {}
    }
}