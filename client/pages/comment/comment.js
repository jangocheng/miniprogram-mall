// pages/comment/comment.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

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
    onInput: function (e) {
        this.setData({
            commentContent: e.detail.value.trim()
        })
    },

    /**
     * 用户发布评论
     * @param {*} e 
     */
    onTapPostComment: function (e) {
        let content = this.data.commentContent
        if (!content) return
        wx.showLoading({
            title: '正在发表评论'
        })
        qcloud.request({
            url: config.service.commentUrl,
            login: true,
            method: 'PUT',
            data: {
                content: content,
                itemId: this.data.item.id
            },
            success: res => {
                wx.hideLoading()
                let data = res.data
                if (!data.code) {
                    wx.showToast({
                        title: '发表评论成功'
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '发表评论失败'
                    })
                }
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '发表评论失败'
                })
            }
        })
    },
})