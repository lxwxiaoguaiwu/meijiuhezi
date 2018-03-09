// pages/nopeople/index.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxlists:[],
    boxlist:[],
    juli:'',
    lat1: '',
    lng1: '', 
  },
  gonopeople:function(res){
    console.log(res)
    if (res.currentTarget.dataset.status == '建设中'){
      wx.showToast({
        title: '抱歉!酒柜建设中',
        icon: 'success',
        duration: 2000
      })
    } else if (res.currentTarget.dataset.status == '维护中'){
      wx.showToast({
        title: '抱歉!酒柜维护中',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '/pages/nopeople/nopeople?id=' + res.currentTarget.id + '&boxname=' + res.currentTarget.dataset.name + '&lat=' + res.currentTarget.dataset.lat + '&lng=' + res.currentTarget.dataset.lng,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var boxlists = [];
    wx.request({
      url: url + '/gradevins',
      data: {

      },
      header: {
        'Accept': "*/*",
      },
      success: function (sres) {
        console.log(sres)
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            console.log(res)
            for (var i = 0; i < sres.data.gradevins.length; i++) {
              var juli = ''
              var lat1 = res.longitude //这里第一个地点的经度
              var lng1 = res.latitude//这里第一个地点的纬度
              var lat2 = sres.data.gradevins[i].longitude//这里第二个地点的经度
              var lng2 = sres.data.gradevins[i].latitude//这里第二个地点的纬度
              var radLat1 = lat1 * Math.PI / 180.0;
              var radLat2 = lat2 * Math.PI / 180.0;
              var a = radLat1 - radLat2;
              var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
              var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
              s = s * 6378.137;
              s = Math.round(s * 10000) / 10000;
              var s = s.toFixed(2) * 100//得出距离
              that.setData({
                juli: s,
              })
              var boxlist = {
                id: sres.data.gradevins[i].id,
                code: sres.data.gradevins[i].code,
                latitude: sres.data.gradevins[i].latitude,
                longitude: sres.data.gradevins[i].longitude,
                name: sres.data.gradevins[i].name,
                status: sres.data.gradevins[i].status,
                juli: Math.round(that.data.juli),
              }
              boxlists.push(boxlist)
            }
            that.setData({
              boxlists: boxlists
            })
            console.log(boxlists)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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