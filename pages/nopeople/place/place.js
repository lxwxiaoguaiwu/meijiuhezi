// pages/nopeople/place/place.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var MD5Util = require('../../../utils/md5.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    submitlist: [],
    userInfo:[],
    serialnum:'',
  },
  goSubmit: function(event){
    var userInfo = publicUrl.globalData.userInfo;
    var that = this;
    wx.request({
      url: url + '/gradorders',
      method: 'POST',
      data: {
        totalprice: that.data.submitlist.price,
        userid: userInfo.id,
        number: that.data.submitlist.num,
        categoryid: that.data.submitlist.id,
        gradevinid: 1
      },
      header:{
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success:function (res) {
        var serialnum = res.data.detailedlist.serialnum;
        that.setData({
          serialnum: serialnum
        })
        var sign = '';
        //<strong><span style="color:#ff0000;">顺序按照ASCII字典序排序</span></strong>  
        var signA = "appId=" + res.data.detailedlist.wxresponse.appid + "&nonceStr=" + res.data.detailedlist.wxresponse.noncestr + "&package=prepay_id=" + res.data.detailedlist.wxresponse.prepayid + "&signType=MD5&timeStamp=" + res.data.detailedlist.wxresponse.timestamp;
        var signB = signA + "&key=mei18jiu18he18zimei18jiu18he18zi";
        sign = MD5Util.MD5(signB).toUpperCase();  
        wx.requestPayment({
          'timeStamp': res.data.detailedlist.wxresponse.timestamp,
          'nonceStr': res.data.detailedlist.wxresponse.noncestr,
          'package': 'prepay_id='+res.data.detailedlist.wxresponse.prepayid,
          'signType': 'MD5',
          'paySign': sign,
          'success':function (res) {
            wx.showToast({
              title: '支付成功',
              icon:'success',
              duration:3000
            });
            wx.navigateTo({
              url: '/pages/nopeople/success/success?name=' + that.data.submitlist.name + '&num=' + that.data.submitlist.num + '&id=' + that.data.submitlist.id + '&boxname=' + that.data.submitlist.boxname + '&serialnum=' + that.data.serialnum,
            })
          },
          'fail':function (res) {
            console.log('fail==============')
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 3000
            });
            // wx.navigateBack({
            //   delta: 1
            // })
          },
        });
      },
      fail:function(res){
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var boxlist = [];
    var userInfo = publicUrl.globalData.userInfo;
    this.setData({
      userInfo: userInfo
    })
    wx.setNavigationBarTitle({
      title: '提交订单'
    })
    var submitlist={
      name: options.name,
      price: options.price,
      pic: options.pic,
      num: options.num,
      id: options.id,
      boxname: options.boxname
    }
    that.setData({
      submitlist:submitlist
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