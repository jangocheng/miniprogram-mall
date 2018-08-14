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
    onLoad: function (options) {
        this.getItem(options.id)
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
     * 用户点击购买按钮
     */
    onTapBuy: function () {
        wx.showLoading({
            title: '商品购买中...',
        })
        let item = Object.assign({
            count: 1
        }, this.data.item)
        qcloud.request({
            url: config.service.orderUrl,
            login: true,
            method: 'POST',
            data: {
                list: [item]
            },
            success: result => {
                wx.hideLoading()
                let data = result.data
                if (!data.code) {
                    wx.showToast({
                        title: '商品购买成功',
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '商品购买失败',
                    })
                }
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '商品购买失败',
                })
            }
        })
    },

    /**
     * 请求单个商品数据
     */
    getItem: function (id) {
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
    },

    /**
     * 添加商品到购物车
     */
    addToCart: function () {
        wx.showLoading({
            title: '正在添加到购物车...',
        })
        qcloud.request({
            url: config.service.cartUrl,
            login: true,
            method: 'PUT',
            data: this.data.item,
            success: res => {
                wx.hideLoading()
                let data = res.data
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
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '添加到购物车失败',
                })
            }
        })
    },
})