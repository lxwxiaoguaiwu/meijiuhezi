// pages/yidaogo/place/place.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var MD5Util = require('../../../utils/md5.js');
Page({
  data: {
    lists:[],
    address:[],
    addlists:{},
    addprice:'',
    caddprice:'',
    leixing:'',
    submitlist:'',
    serialnum:'',
    submitlist: [],
    addprice:'',
  },
  goSubmit: function (res) {
    var userInfo = publicUrl.globalData.userInfo;
    var that = this;
    console.log(that.data.winenums)
    wx.request({
      url: 'https://api.changching.cn/api/v3/weborders',
      method: 'POST',
      data: {
        price: that.data.addprice,
        addressid: that.data.addlists.id,
        userid: userInfo.id,
        wineid: that.data.wineids,
        number: that.data.winenums,
      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        console.log(res.data);
        var serialnum = res.data.weborder.wxresponse;
        that.setData({
          serialnum: serialnum
        })
        console.log(that.data.serialnum)
        console.log('调起支付');
        var sign = '';
        //<strong><span style="color:#ff0000;">顺序按照ASCII字典序排序</span></strong>  
        var signA = "appId=" + res.data.weborder.wxresponse.appid + "&nonceStr=" + res.data.weborder.wxresponse.noncestr + "&package=prepay_id=" + res.data.weborder.wxresponse.prepayid + "&signType=MD5&timeStamp=" + res.data.weborder.wxresponse.timestamp;
        var signB = signA + "&key=mei18jiu18he18zimei18jiu18he18zi";
        console.log(signA)
        console.log(signB)
        sign = MD5Util.MD5(signB).toUpperCase();
        console.log(sign)
        wx.requestPayment({
          'timeStamp': res.data.weborder.wxresponse.timestamp,
          'nonceStr': res.data.weborder.wxresponse.noncestr,
          'package': 'prepay_id=' + res.data.weborder.wxresponse.prepayid,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            console.log(that.data.submitlist)
            console.log(res)
            console.log('支付成功');
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
            console.log(that.data.clists)
            var clists = JSON.stringify(that.data.clists);
            console.log(clists)
            wx.navigateTo({
              url: '/pages/yidaogo/success/success?clists=' + clists,
            })
          },
          'fail': function (res) {
            console.log(res)
            console.log('支付失败');
            wx.navigateBack({
              delta: 2
            })
          },
        });
      }
    })
  },
  choiceAddress:function(res){
    console.log(res)
    wx.navigateTo({
      url: '/pages/yidaogo/address_multi/address_multi?id=' + res.currentTarget.dataset.list[0].id + '&name=' + res.currentTarget.dataset.list[0].name + '&num=' + res.currentTarget.dataset.list[0].num + '&pic=' + res.currentTarget.dataset.list[0].pic + '&price=' + res.currentTarget.dataset.list[0].price,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      leixing: options.leixing,
    })
    var lists = [];
    var clists = [];
    var address = [];
    var wineids = [];
    var winenums = [];
    var addlists = [];
    var alists = [];
    if (options.leixing == 'address'){
      that.setData({
        addprice: options.price
      })
      var list = {
        id: options.id,
        name: options.name,
        num: options.num,
        pic: options.pic,
        price: options.price,
      }
      var wineid = options.id;
      wineids.push(wineid)
      console.log(wineids)
      var winenum = options.num;
      winenums.push(winenum)
      console.log(winenums)
      clists.push(list)
      that.setData({
        clists:clists,
        wineids: wineids,
        winenums: winenums,
        addprice: options.price,
      })
    }else if(options.leixing=='one'){
      var list = {
        id: options.id,
        name: options.name,
        num: options.num,
        pic: options.pic,
        price: options.price,
      }
      var wineid = options.id;
      wineids.push(wineid)
      console.log(wineids)
      var winenum = options.num;
      winenums.push(winenum)
      console.log(winenums)
      clists.push(list)
      that.setData({
        clists: clists,
        wineids: wineids,
        winenums: winenums,
        addprice: options.price,
      })
      console.log(that.data.clists)
      console.log(that.data.wineids)
      console.log(that.data.winenums)
    }else{
      var searchData = wx.getStorageSync('currlist')
      console.log(searchData)
      for (var i = 0; i < searchData.length; i++) {
        var wineid = searchData[i].id;
        wineids.push(wineid)
      }
      for (var i = 0; i < searchData.length; i++) {
        var winenum = searchData[i].number;
        winenums.push(winenum)
        console.log(winenums)
      }
      for (var i = 0; i < searchData.length; i++) {
        var list = {
          name: searchData[i].name,
          id: searchData[i].id,
          price: searchData[i].price,
          pic: searchData[i].asset,
          num: searchData[i].number
        }
        clists.push(list)
        that.setData({
          clists: clists,
          address: addres,
          wineids: wineids,
          winenums: winenums,
          addprice: options.price,
        })
        console.log(clists)
      }
    }
    var addres={
      addressinfo: options.addressinfo,
      name: options.toname,
      tel: options.tel
    }
    address.push(addres)
    that.setData({
      address: addres,
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
    var userInfo = publicUrl.globalData.userInfo;
    wx.request({
      url: 'https://api.changching.cn/api/v3/alcoaddresses?userid=' + userInfo.id,
      data: {
      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.address.length)
        var addlists = {
          id: res.data.address[res.data.address.length - 1].id,
          name: res.data.address[res.data.address.length - 1].toname,
          addressinfo: res.data.address[res.data.address.length - 1].addressinfo,
          tel: res.data.address[res.data.address.length - 1].tel,
        }
        that.setData({
          addlists: addlists,
        })
        console.log(that.data.addlists)
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