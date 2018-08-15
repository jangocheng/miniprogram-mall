const DB = require('../utils/db')

module.exports = {
    /**
    * 添加评论
    */
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let username = ctx.state.$wxInfo.userinfo.nickName
        let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
        let itemId = +ctx.request.body.itemId
        let content = ctx.request.body.content || null
        if (!isNaN(itemId)) {
            await DB.query('INSERT INTO comment(user, username, avatar, content, item_id) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, content, itemId])
        }
        ctx.state.data = {}
    }
} 