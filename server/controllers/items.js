const DB = require('../utils/db')
module.exports = {
    list: async ctx => {
        ctx.state.data = await DB.query("SELECT * FROM item;")
    },
    detail: async ctx => {
        itemID = + ctx.params.id;
        ctx.state.data = await DB.query("SELECT * FROM item WHERE item.id = ?", [itemID])
    }
}