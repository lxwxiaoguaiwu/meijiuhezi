// pages/personal/personal.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
// var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userInfoAvatar: '',
    province: '',
    city: '',    
    motto: 'Hello World',
    userInfo:[],
    // orderItems
  },
  yifukuan:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../order/order?current=' + e.currentTarget.dataset.current,
    })
  },
  daishiyong:function(e){
    wx.navigateTo({
      url: '../order/order?current=' + e.currentTarget.dataset.current,
    })
  },
  daipingjia:function(e){
    wx.navigateTo({
      url: '../order/order?current=' + e.currentTarget.dataset.current,
    })
  },
  totabNavto:function(e){
    wx.navigateTo({
      url: '../yidaoorder/yidaoorder?current=' + e.currentTarget.dataset.current,
    })
  },
  comment:function(e){
    wx.navigateTo({
      url: '../yidaoorder/yidaoorder?current=' + e.currentTarget.dataset.current,
    })
  },
  tabNav:function(e){
    wx.navigateTo({
      url: '../yidaoorder/yidaoorder?current=' + e.currentTarget.dataset.current,
    })
  },
  goAboutme:function(){
    wx.navigateTo({
      url: '../personal/aboutme/aboutme',
    })
  },
  toOrder: function (event) {
    wx.navigateTo({
      url: '../order/order?state=' + event.currentTarget.dataset.state,
    })
    
  },
  toOrderyidao:function(event){
    wx.navigateTo({
      url: '../yidaoorder/yidaoorder?state=' + event.currentTarget.dataset.state,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = publicUrl.globalData.userInfo;
    console.log(userInfo)
    this.setData({
      userInfo:userInfo
    })
    wx.setNavigationBarTitle({
      title: '个人中心'
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
  
  }
})