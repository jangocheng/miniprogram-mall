const DB = require('../utils/db')
module.exports = {
    list: async ctx => {
        ctx.state.data = await DB.query("SELECT * FROM item;")
    },
    detail: async ctx => {
        let item
        let itemId = +ctx.params.id;
        if (!isNaN(itemId)) {
            item = (await DB.query("SELECT * FROM item WHERE item.id = ?", [itemId]))[0]
        } else {
            item = {}
        }

        // 评论计数
        item.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.item_id = ?', [itemId]))[0].comment_count || 0
        // 最早的评论
        item.commentHot = (await DB.query('SELECT * FROM comment WHERE comment.item_id = ? LIMIT 1 OFFSET 0', [itemId]))[0] || null

        ctx.state.data = item
    }
}