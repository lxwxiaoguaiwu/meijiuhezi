// pages/yidaogo/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    num:0,
    ssclists:[],
    showDialog: false,
    showDialogRight: false,
  },
  gocomment:function(){
    wx.navigateTo({
      url: '/pages/yidaoorder/yidaoorder?current=2',
    })
  },
  back:function(){
    wx.switchTab({
      url: '/pages/yidaogo/yidaogo'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ssclists = [];
    console.log(options)
    var clists = wx.getStorage('currlist')
    console.log(clists)
    if (clists){
      for (var i = 0; i < clists.length; i++) {
        var clist = {
          id: clists.id,
          name: clists[i].name,
          num: clists[i].num,
          pic: clists[i].pic,
          price: clists[i].price
        }
        ssclists.push(clist)
      }
      that.setData({
        ssclists: ssclists,
      })
    }else{
      var clists = JSON.parse(options.clists);
      console.log(clists)
      for (var i = 0; i < clists.length; i++) {
        var clist = {
          id: clists.id,
          name: clists[i].name,
          num: clists[i].num,
          pic: clists[i].pic,
          price: clists[i].price
        }
        ssclists.push(clist)
      }
      that.setData({
        ssclists: ssclists,
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