// pages/home/home.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [], // 商品列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getItems()
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
     * 请求商品列表数据
     */
    getItems: function () {
        util.showBusy('商品数据加载中...')
        var that = this
        qcloud.request({
            url: config.service.itemUrl,
            success: res => {
                let data = res.data
                if (!data.code) {
                    util.showSuccess('商品数据加载完成')
                    that.setData({
                        items: data.data
                    })
                } else {
                    util.showModel('商品数据加载失败', data)
                }
            },
            fail: res => {
                util.showModel('商品数据加载失败', res)
            }
        })
    },

    addToCart: function (e) {
        let item
        let itemId = e.currentTarget.dataset.id
        let items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
            if (items[i].id === itemId) {
                item = items[i]
                break
            }
        }
        if (item) {
            qcloud.request({
                url: config.service.cartUrl,
                login: true,
                method: 'PUT',
                data: item,
                success: result => {
                    let data = result.data
                    if (!data.code) {
                        wx.showToast({
                            title: '已添加到购物车',
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '添加到购物车失败',
                        })
                    }
                },
                fail: () => {
                    wx.showToast({
                        icon: 'none',
                        title: '添加到购物车失败',
                    })
                }
            })
        }
    },
})