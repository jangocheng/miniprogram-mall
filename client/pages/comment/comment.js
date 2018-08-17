// pages/comment/comment.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
        commentContent: '',
        commentImages: [],
        comments: [], // 评论列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let item = {
            commented: options.commented || true,
            orderId: options.orderId,
            id: options.id,
            title: options.title,
            price: options.price,
            image: options.image
        }
        this.setData({
            item: item
        })
        this.getComments(item.id)
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
        let that = this
        let content = this.data.commentContent
        if (!content) return
        wx.showLoading({
            title: '正在发表评论'
        })
        this.uploadImage(images => {
            qcloud.request({
                url: config.service.commentUrl,
                login: true,
                method: 'PUT',
                data: {
                    content: content,
                    images: images,
                    itemId: this.data.item.id,
                    orderId: this.data.item.orderId
                },
                success: res => {
                    wx.hideLoading()
                    let data = res.data
                    if (!data.code) {
                        // 成功后，刷新评论
                        that.getComments(that.data.item.id)
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
        })
    },

    /**
     * 用户点击选择图片
     */
    onTapChooseImage: function () {
        let currentImages = this.data.commentImages
        wx.chooseImage({
            count: 3,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
                currentImages = currentImages.concat(res.tempFilePaths)
                let end = currentImages.length
                let begin = Math.max(end - 3, 0)
                currentImages = currentImages.slice(begin, end)
                this.setData({
                    commentImages: currentImages
                })
            },
        })
    },

    /**
     * 用户点击预览图片
     * @param {*} e 
     */
    onTapPreviewImage: function (e) {
        let target = e.currentTarget
        let src = target.dataset.src
        let urls = target.dataset.urls || this.data.commentImages
        wx.previewImage({
            current: src,
            urls: urls
        })
    },

    /**
     * 上传图片
     */
    uploadImage: function (e) {
        let commentImages = this.data.commentImages
        let images = []
        if (commentImages.length) {
            let length = commentImages.length
            for (let i = 0; i < length; ++i) {
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: commentImages[i],
                    name: 'file',
                    success: res => {
                        let data = JSON.parse(res.data)
                        --length
                        if (!data.code) {
                            images.push(data.data.imgUrl)
                        }
                        if (length <= 0) {
                            e && e(images)
                        }
                    },
                    fail: () => {
                        --length
                    }
                })
            }
        } else {
            e && e(images)
        }
    },

    /**
     * 获取用户评论列表
     * @param {*} id 
     */
    getComments(id) {
        qcloud.request({
            url: config.service.commentUrl,
            data: {
                itemId: id
            },
            success: res => {
                let data = res.data
                if (!data.code) {
                    this.setData({
                        comments: data.data.map(item => {
                            let itemDate = new Date(item.create_time)
                            item.createTime = util.formatTime(itemDate)
                            item.images = item.images ? item.images.split(';;') : []
                            return item
                        })
                    })
                }
            },
        })
    }
})