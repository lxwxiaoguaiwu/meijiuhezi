// pages/yidaogo/yidaogo.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientHeight: 0,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular: true,
    scrollH:0,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    showActionSheet: true
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  whitesNav:function(e){
    var that = this;
    var whiteslists = [];
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  yangjiusNav:function(e){
    var that = this;
    var yangjiuslists = [];
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  beersNav: function (e) {
    var that = this;
    var beerslists = [];
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getRedwine:function(event){
    console.log(event)
    wx.navigateTo({
      url: 'yidaodetaile/yidaodetaile?id=' + event.currentTarget.id,
    })
  },
  scroll: function (e) {
    console.log(e)
    console.log("===scrollHeight=" + e.detail.scrollHeight)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hongjiulists = [];
    var swiperlists = [];
    wx.setNavigationBarTitle({
      title: '易到Go'
    })
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        that.setData({
          scrollH: scrollH,
        });

      }
    })

  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    var winelists = [];
    var whiteslists = [];
    var beerslists = [];
    var yangjiuslists = [];
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0) {
      wx.request({
        url: url + '/webgoods?leibie=' + '红酒',
        data: {

        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.webgoods.length; i++) {
            var winelist = {
              id: res.data.webgoods[i].id,
              name: res.data.webgoods[i].name,
              price: res.data.webgoods[i].currprice,
              asset: picUrl + res.data.webgoods[i].asset,
            }
            winelists.push(winelist)
          }
          that.setData({
            winelists: winelists,
          })
        }
      })
    } else if (e.detail.current == 1) {
      wx.request({
        url: url + '/webgoods?leibie=' + '白酒',
        data: {

        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.webgoods.length; i++) {
            var whiteslist = {
              id: res.data.webgoods[i].id,
              name: res.data.webgoods[i].name,
              price: res.data.webgoods[i].currprice,
              asset: picUrl + res.data.webgoods[i].asset,
            }
            whiteslists.push(whiteslist)
          }
          that.setData({
            whiteslists: whiteslists,
          })
        }
      })
    } else if (e.detail.current == 2) {
      wx.request({
        url: url + '/webgoods?leibie=' + '洋酒',
        data: {

        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.webgoods.length; i++) {
            var yangjiuslist = {
              id: res.data.webgoods[i].id,
              name: res.data.webgoods[i].name,
              price: res.data.webgoods[i].currprice,
              asset: picUrl + res.data.webgoods[i].asset,
            }
            yangjiuslists.push(yangjiuslist)
          }
          that.setData({
            yangjiuslists: yangjiuslists
          })
        }
      })
    } else if (e.detail.current == 3) {
      wx.request({
        url: url + '/webgoods?leibie=' + '啤酒',
        data: {

        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)
          for(var i=0; i<res.data.webgoods.length;i++){
            var beerslist = {
              id: res.data.webgoods[i].id,
              name: res.data.webgoods[i].name,
              price: res.data.webgoods[i].currprice,
              asset: picUrl + res.data.webgoods[i].asset,
            }
            beerslists.push(beerslist)
          }
          that.setData({
            beerslists: beerslists,
          })
        }
      })
    }

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    console.log(e)
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
    var that = this;
    var beerslists = [];
    var winelists = [];
    var whiteslists = [];
    var yangjiuslists = [];
    wx.request({
      url: url + '/webgoods?leibie='+'红酒',
      data: {

      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.webgoods.length; i++) {
          var winelist = {
            id: res.data.webgoods[i].id,
            name: res.data.webgoods[i].name,
            price: res.data.webgoods[i].currprice,
            asset: picUrl + res.data.webgoods[i].asset,
          }
          winelists.push(winelist)
        }
        that.setData({
          winelists: winelists,
        })
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

  }
})
