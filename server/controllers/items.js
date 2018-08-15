const DB = require('../utils/db')
module.exports = {
    list: async ctx => {
        ctx.state.data = await DB.query("SELECT * FROM item;")
    },
    detail: async ctx => {
        let item
        let itemID = +ctx.params.id;
        if (!isNaN(itemID)) {
            item = (await DB.query("SELECT * FROM item WHERE item.id = ?", [itemID]))[0]
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