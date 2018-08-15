// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
        commentContent: '',
        comments: [{
            avatar: '/images/user.png',
            username: 'test1',
            createTime: '2018年01月01日',
            content: '测试评论',
        }, {
            avatar: '/images/user.png',
            username: 'test2',
            createTime: '2018年02月01日',
            content: '测试评论',
        }], // 评论列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let item = {
            id: options.id,
            title: options.title,
            price: options.price,
            image: options.image
        }
        this.setData({
            item: item
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 用户输入时，存储评论数据
     * @param {*} e 
     */
    onInput(e) {
        this.setData({
            commentContent: e.detail.value.trim()
        })
    },
})