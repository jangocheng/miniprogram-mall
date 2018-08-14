// pages/cart/cart.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        locationAuthType: app.data.locationAuthType,
        items: [], // 购物车商品列表
        selectMap: [undefined, true, undefined], // 购物车中选中的id哈希表
        totalAmount: 45, // 购物车总金额
        isEdit: false, // 购物车是否处于编辑状态
        isSelectAll: true, // 购物车中商品是否全选
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        // 同步授权状态
        this.setData({
            locationAuthType: app.data.locationAuthType
        })
        app.checkSession({
            success: ({ userInfo }) => {
                this.setData({ userInfo })
                this.getCart()
            }
        })
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
     * 用户点击登录
     */
    onTapLogin: function () {
        app.login({
            success: ({ userInfo }) => {
                this.setData({
                    userInfo,
                    locationAuthType: app.data.locationAuthType
                })
                this.getCart()
            },
            error: () => {
                this.setData({
                    locationAuthType: app.data.locationAuthType
                })
            }
        })
    },

    /**
     * 从服务器拉取购物车数据
     */
    getCart: function () {
        wx.showLoading({
            title: '刷新购物车数据...',
        })
        qcloud.request({
            url: config.service.cartUrl,
            login: true,
            success: res => {
                wx.hideLoading()
                let data = res.data
                if (!data.code) {
                    this.setData({
                        items: data.data
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '数据刷新失败',
                    })
                }
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '数据刷新失败',
                })
            }
        })
    }
})