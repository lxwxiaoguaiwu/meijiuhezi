// pages/nopeople/success/success.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var wxbarcode = require('../../../utils/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:{},
    code: '1234567890123456789'
  },
  gohomepage: function () {
    console.log(111111111)
    wx.navigateBack({
      delta: 4
    })
  },
  choiceMap:function(){
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var code = options.serialnum;
    that.setData({
      code:code
    })
    wxbarcode.barcode('barcode', code, 680, 200);
    wxbarcode.qrcode('qrcode', code, 420, 420);

    wx.setNavigationBarTitle({
      title: '购买成功'
    })
    
    var orderlist={
      name:options.name,
      num: options.num,
      boxname: options.boxname,
    }
    that.setData({
      orderlist: orderlist
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