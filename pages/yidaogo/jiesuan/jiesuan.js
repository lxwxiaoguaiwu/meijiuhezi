// pages/yidaogo/jiesuan/jiesuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    number: 0,
    winelist:[],
    carlists:[],
    currlist:[],
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
  },
  xuangou:function(){
    wx.navigateBack({
      delta: 3
    })
  },
  bindMinus: function (e) {
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carlists[index].number;
    if (num > 1) {
      num--;
    }
    console.log(this.data.count)
    if (e.currentTarget.dataset.selected == true) {
      this.setData({
        count: this.data.count + 1*e.currentTarget.dataset.price,
      });
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carlists = this.data.carlists;
    carlists[index].number = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
      carlists: carlists,
      minusStatuses: minusStatuses
    });
  },
  bindPlus: function (e) {
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carlists[index].number;
    console.log(num)
    console.log(this.data.carlists)
    num++;
    console.log(this.data.count)
    if (e.currentTarget.dataset.selected==true){
      this.setData({
        count: this.data.count + 1*e.currentTarget.dataset.price,
      });
      console.log(this.data.count)
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carlists = this.data.carlists;
    carlists[index].number = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
      carlists: carlists,
      minusStatuses: minusStatuses
    });
  },
  bindCheckbox: function (e) {
    console.log(e);
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    console.log(that.data.carlists)
    var selected = that.data.carlists[index].selected;
    var carlists = that.data.carlists;
    var num = parseInt(that.data.carlists[index].number);
    var price = that.data.carlists[index].price;
    if (!selected) {
      var currlist = [];
      var currlist = wx.getStorageSync('currlist') || []
      currlist.push(that.data.carlists[index])
      wx.setStorageSync('currlist', currlist)
      console.log(currlist)
      that.setData({
        currlist: currlist,
        count: that.data.count + num * price,
        number: num + that.data.number
      });
    } else {
      wx.removeStorageSync('currlist')
      that.setData({
        count: that.data.count - num * price,
        number: that.data.number - num
      });
    }
    carlists[index].selected = !selected;
    that.setData({
      carlists: carlists
    });
  },
  qingkong:function(e){
    console.log(e)
    // wx.removeStorageSync('winelist')
    wx.removeStorage({
      key: 'winelist',
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '/pages/yidaogo/jiesuan/jiesuan',
        })
        wx.showToast({
          title: '清空购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  setPayment:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../../yidaogo/place/place?leixing='+'more'+'&price='+this.data.count,
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      var that = this;
      that.setData({
        number:options.number
      })
      // var winelist=[];
      // var carlists = [];
      // var searchData = wx.getStorageSync('winelist') || []
      // console.log(searchData)
      // for (var i = 0; i < searchData.length; i++) {
      //   var carlist={
      //     name: searchData[i].name,
      //     id: searchData[i].id,
      //     price: searchData[i].price,
      //     asset: searchData[i].asset,
      //     number: that.data.number,
      //   }
      //   carlists.push(carlist)
      // }
      console.log(options)
      that.setData({
        // carlists: carlists,
        options: options,
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
    var that = this;
    var winelist = [];
    wx.removeStorageSync('currlist')
    console.log(that.data.options)
    var winelist = [];
    var carlists = [];
    var searchData = wx.getStorageSync('winelist') || []
    console.log(searchData)
    console.log(searchData.length)
    for (var i = 0; i < searchData.length; i++) {
      var carlist = {
        name: searchData[i].name,
        id: searchData[i].id,
        price: searchData[i].price,
        asset: searchData[i].asset,
        number: that.data.number,
        // selected: true,
      }
      carlists.push(carlist)
      // console.log(carlists.length)
      // console.log(carlists[i].price)
      // var sum=0
      // console.log(Number(carlists[i].price))
      // sum += Number(carlists[i].price)
      // console.log('sum============='+sum)
      // that.setData({
      //   count: sum
      // })
      // console.log('that.data.count==========='+that.data.count)
    }
    that.setData({
      carlists: carlists,
    })
    console.log(that.data.carlists)
    var list = {
      name: that.data.options.name,
      price: that.data.options.price,
      id: that.data.options.id,
      number: that.data.options.number,
      asset: that.data.options.asset,
      selected: true
    }
    winelist.push(list);
    that.setData({
      winelist: winelist
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