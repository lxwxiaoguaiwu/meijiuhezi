// pages/nopeople/nopeople.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxname:'',
    boxlat:0.01,
    boxlng:0.01
  },
  choiceMap:function(res){
    console.log(res)
    console.log(this.data.boxlat)
    var latitude = this.data.boxlat
    console.log(this.data.boxlng)
    var longitude = this.data.boxlng
    console.log(Number(latitude))
    console.log(Number(longitude))
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      scale: 28
    })
  },
  getRedwine: function (event) {
    console.log(event)
    wx.navigateTo({
      url: 'winedetaile/winedetaile?id=' + event.currentTarget.id + '&boxname=' + event.currentTarget.dataset.boxname + '&boxlat=' + event.currentTarget.dataset.boxlat + '&boxlng=' + event.currentTarget.dataset.boxlng,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var boxlat = 0;
    var boxlng = 0;
    that.setData({
      boxlat: options.lat,
      boxlng: options.lng
    })
    var winelist = [];
    var boxlist = [];
    var whiteslist = [];
    var yangjiuslist = [];
    var beerslist = [];
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
    wx.setNavigationBarTitle({
      title: '无人Go'
    })
    wx.request({
      url: url+'/gradevins/'+options.id,
      data: {
        
      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        for (var i = 0; i < res.data.wine.length; i++) {
          var wineindex = res.data.wine[i].asset.indexOf('?');
          var list = {
            id: res.data.wine[i].id,
            name: res.data.wine[i].name,
            winepic: picUrl + res.data.wine[i].asset.substring(0, wineindex),
            price: res.data.wine[i].currprice,
            number: res.data.wine[i].number,
          }
          winelist.push(list);
        }
        for (var i = 0; i < res.data.spirits.length; i++) {
          var wineindex = res.data.spirits[i].asset.indexOf('?');
          var whites = {
            id: res.data.spirits[i].id,
            name: res.data.spirits[i].name,
            winepic: picUrl + res.data.spirits[i].asset.substring(0, wineindex),
            price: res.data.spirits[i].currprice,
            number: res.data.spirits[i].number,
          }
          whiteslist.push(whites);
        }
        for (var i = 0; i < res.data.foreign.length; i++) {
          var wineindex = res.data.foreign[i].asset.indexOf('?');
          var yangjius = {
            id: res.data.foreign[i].id,
            name: res.data.foreign[i].name,
            winepic: picUrl + res.data.foreign[i].asset.substring(0, wineindex),
            price: res.data.foreign[i].currprice,
            number: res.data.foreign[i].number,
          }
          yangjiuslist.push(yangjius);
        }
        for (var i = 0; i < res.data.beers.length; i++) {
          var wineindex = res.data.beers[i].asset.indexOf('?');
          var beers = {
            id: res.data.beers[i].id,
            name: res.data.beers[i].name,
            winepic: picUrl + res.data.beers[i].asset.substring(0, wineindex),
            price: res.data.beers[i].currprice,
            number: res.data.beers[i].number,
          }
          beerslist.push(beers);
        }
        that.setData({
          winelist: winelist,
          whiteslist: whiteslist,
          yangjiuslist: yangjiuslist,
          beerslist: beerslist,
          boxname: options.boxname
        })
      }
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