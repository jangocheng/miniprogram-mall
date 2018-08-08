// pages/user/user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        locationAuthType: UNPROMPTED
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.checkSession({
            success: ({
                userInfo
            }) => {
                this.setData({
                    userInfo
                })
            },
            error: () => {}
        })
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
     * 用户点击登录按钮
     */
    onTapLogin: function() {
        this.doQcloudLogin({
            success: ({
                userInfo
            }) => {
                this.setData({
                    userInfo: userInfo
                })
            }
        })
    },

    login({
        success,
        error
    }) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo'] === false) {
                    this.setData({
                        locationAuthType: UNAUTHORIZED
                    })
                    // 已拒绝授权
                    wx.showModal({
                        title: '提示',
                        content: '请授权我们获取您的用户信息',
                        showCancel: false
                    })
                } else {
                    this.setData({
                        locationAuthType: AUTHORIZED
                    })
                    this.doQcloudLogin({
                        success,
                        error
                    })
                }
            }
        })
    },

    /**
     * 腾讯云登录接口操作
     */
    doQcloudLogin: function({
        success,
        error
    }) {
        qcloud.login({
            success: res => {
                if (res) {
                    let userInfo = res
                    success && success({
                        userInfo
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    this.getUserInfo({
                        success,
                        error
                    })
                }
            },
            fail: () => {
                error && error()
            }
        })
    },

    /**
     * 检查用户 Session
     */
    checkSession: function({
        success,
        error
    }) {
        wx.checkSession({
            success: () => {
                this.getUserInfo({
                    success,
                    error
                })
            },
            fail: () => {
                error && error()
            }
        })
    },


    /**
     * 获取用户信息
     */
    getUserInfo: function({
        success,
        error
    }) {
        qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success: res => {
                let data = res.data
                if (!data.code) {
                    let userInfo = data.data
                    success && success({
                        userInfo
                    })
                } else {
                    error && error()
                }
            },
            fail: () => {
                error && error()
            }
        })
    },


})