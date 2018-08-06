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
        ctx.state.data = item
    }
}