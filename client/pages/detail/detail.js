// pages/detail/detail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getItem(options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 请求单个商品数据
     */
    getItem(id) {
        util.showBusy('商品数据加载中...')
        qcloud.request({
            url: config.service.itemUrl + id,
            success: res => {
                util.hideBusy()
                let data = res.data
                if (!data.code) {
                    this.setData({
                        item: data.data
                    })
                } else {
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 2000)
                }
            },
            fail: res => {
                util.showModel('请求失败', res)
                setTimeout(() => {
                    wx.navigateBack()
                }, 2000)
            }
        })
    }
})