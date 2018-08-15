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
        selectedMap: [], // 购物车中选中的id哈希表
        price: 0, // 购物车总金额
        isEdit: false, // 购物车是否处于编辑状态
        isSelectAll: false, // 购物车中商品是否全选
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
    },

    /**
     * 购物车商品的单个选中
     */
    onTapSelectSingle: function (e) {
        let selectId = e.currentTarget.dataset.id
        let selectedMap = this.data.selectedMap
        let items = this.data.items
        let isSelectAll = this.data.isSelectAll
        let totalAmount = items.length
        let selectedAmount = 0
        let price = this.data.price

        // 单项商品被选中/取消
        selectedMap[selectId] = !selectedMap[selectId]
        selectedMap.forEach(selected => {
            selectedAmount = selected ? selectedAmount + 1 : selectedAmount
        })
        // 判断选中的商品个数是否与商品总数相等，则添加/取消全选
        isSelectAll = (totalAmount === selectedAmount) ? true : false

        price = this.estimatedTotal(items, selectedMap)
        this.setData({
            selectedMap,
            isSelectAll,
            price
        })
    },

    /**
     * 购物车商品的全部选中
     */
    onTapSelectAll: function (e) {
        let selectedMap = this.data.selectedMap
        let items = this.data.items
        let isSelectAll = this.data.isSelectAll
        let price = this.data.price

        // 全选按钮被选中/取消
        isSelectAll = !isSelectAll
        // 遍历并修改所有商品的状态
        items.forEach(item => {
            selectedMap[item.id] = isSelectAll
        })

        price = this.estimatedTotal(items, selectedMap)
        this.setData({
            isSelectAll,
            selectedMap,
            price
        })
    },

    /**
     * 用户点击编辑
     */
    onTapEdit: function () {
        let isEdit = this.data.isEdit
        this.setData({
            isEdit: !isEdit
        })
    },

    /**
     * 调整商品数量
     * @param {*} event 
     */
    adjustCount: function (event) {
        let selectedMap = this.data.selectedMap
        let items = this.data.items
        let dataset = event.currentTarget.dataset
        let adjustType = dataset.type
        let itemId = dataset.id
        let item
        let index
        for (index = 0; index < items.length; index++) {
            if (itemId === items[index].id) {
                item = items[index]
                break
            }
        }
        if (item) {
            if (adjustType === 'add') {
                // 点击加号
                item.count++
            } else {
                // 点击减号
                if (item.count <= 1) {
                    // 商品数量不超过1，点击减号相当于删除
                    delete selectedMap[itemId]
                    items.splice(index, 1)
                } else {
                    // 商品数量大于1
                    item.count--
                }
            }
        }
        // 调整结算总价
        let price = this.estimatedTotal(items, selectedMap)
        this.setData({
            price,
            items,
            selectedMap
        })
    },

    /**
     * 估算价格
     */
    estimatedTotal: function (items, selectedMap) {
        let price = 0
        items.forEach(item => {
            price = selectedMap[item.id] ? price + item.price * item.count : price
        })
        return price
    }
})