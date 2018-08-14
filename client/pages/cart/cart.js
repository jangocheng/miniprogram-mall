// pages/cart/cart.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: 1,
        locationAuthType: app.data.locationAuthType,
        items: [{
            id: 1,
            title: '商品1',
            image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
            price: 45,
            source: '海外·瑞典',
            count: 1,
        }, {
            id: 2,
            title: '商品2',
            image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
            price: 158,
            source: '海外·新西兰',
            count: 3,
        }], // 购物车商品列表
        selectMap: [undefined, true, undefined], // 购物车中选中的id哈希表
        totalAmount: 45, // 购物车总金额
        isEdit: false, // 购物车是否处于编辑状态
        isSelectAll: true, // 购物车中商品是否全选
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    }
})