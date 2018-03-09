// pages/order/order.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    clientHeight: 0,
    isShow: true,
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    showModalStatus: false,
    showDialog: false,
    showDialogRight: false,
    categoryid: 0,
    currtags: '',
    leibie: '',
    items: [
      { name: '1001', value: '果味十足', checked: false, },
      { name: '1002', value: '味道浓郁', checked: false, },
      { name: '1003', value: '清新爽口', checked: false, },
      { name: '1004', value: '口感饱满', checked: false, },
      { name: '1005', value: '复杂平衡', checked: false, },
    ],
    yitems: [
      { name: '1101', value: '口感浓烈', checked: false, },
      { name: '1102', value: '柔和顺滑', checked: false, },
      { name: '1103', value: '香气复杂', checked: false, },
      { name: '1104', value: '色泽清澈', checked: false, },
      { name: '1105', value: '回味悠长', checked: false, },
    ],
    bitems: [
      { name: '1201', value: '酒香馥郁', checked: false, },
      { name: '1202', value: '优雅醇厚', checked: false, },
      { name: '1203', value: '绵甜爽口', checked: false, },
      { name: '1204', value: '入口柔顺', checked: false, },
      { name: '1205', value: '回味悠长', checked: false, },
    ],
    pitems: [
      { name: '1301', value: '泡沫丰富', checked: false, },
      { name: '1302', value: '酒体厚重', checked: false, },
      { name: '1303', value: '口感清爽', checked: false, },
      { name: '1304', value: '味道复杂', checked: false, },
      { name: '1305', value: '苦中带甜', checked: false, },
    ],
  },
  checkChange: function (e) {
    if(this.data.leibie=='红酒'){
      console.log('radio发生change事件，携带value值为：', e)
      var that = this
      that.setData({
        value: e.detail.value
      })
      console.log(that.data.value)
      var items = that.data.items;
      console.log(that.data.items)
      var checkArr = e.detail.value;
      console.log(checkArr)
      console.log(e.detail.value)
      for (var i = 0; i < items.length; i++) {
        if (checkArr.indexOf(i + 1001 + "") != -1) {
          items[i].checked = true;
        } else {
          items[i].checked = false;
        }
      }
      that.setData({
        items: items,
        currtags: e.detail.value
      })
    }else if(this.data.leibie=='洋酒'){
      console.log('radio发生change事件，携带value值为：', e)
      var that = this
      that.setData({
        value: e.detail.value
      })
      console.log(that.data.value)
      var yitems = that.data.yitems;
      console.log(that.data.ytems)
      var checkArr = e.detail.value;
      console.log(e.detail.value)
      for (var i = 0; i < yitems.length; i++) {
        if (checkArr.indexOf(i + 1101 + "") != -1) {
          yitems[i].checked = true;
        } else {
          yitems[i].checked = false;
        }
      }
      that.setData({
        yitems: yitems,
        currtags: e.detail.value
      })
    }else if (this.data.leibie == '白酒') {
      console.log('radio发生change事件，携带value值为：', e)
      var that = this
      that.setData({
        value: e.detail.value
      })
      console.log(that.data.value)
      var bitems = that.data.bitems;
      console.log(that.data.bitems)
      var checkArr = e.detail.value;
      console.log(e.detail.value)
      for (var i = 0; i < bitems.length; i++) {
        if (checkArr.indexOf(i + 1201 + "") != -1) {
          bitems[i].checked = true;
        } else {
          bitems[i].checked = false;
        }
      }
      that.setData({
        bitems: bitems,
        currtags: e.detail.value
      })
    }
  },
  powerDrawer: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    that.util(currentStatu)
    that.setData({
      categoryid: e.currentTarget.dataset.id,
      leibie: e.currentTarget.dataset.leibie
    })
  },
  postComment:function(e){
    console.log(e)
    console.log('orderid==========='+e.currentTarget.dataset.orderid)
    var that = this;
    var code = '';
    code = that.data.currtags.toString()
    console.log("1111111111111111111" + code)
    console.log(that.data.categoryid)
    var userInfo = publicUrl.globalData.userInfo;
    if (that.data.currtags!=''){
      wx.request({
        url: 'https://api.changching.cn/api/v3/alcrecords',
        method: 'POST',
        data: {
          orderid: e.currentTarget.dataset.orderid,
          leibie: 'w',
          categoryid: that.data.categoryid,
          userid: userInfo.id,
          tagsc: code
        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res)
          var currentStatu = e.currentTarget.dataset.statu;
          that.util(currentStatu)
          wx.showToast({
            title: '点评成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/personal/personal',
          })
        }
      })
    }else{
      wx.showToast({
        title: '请选择标签',
        icon: 'none',
        duration: 2000
      })
    }
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  bindChange: function (e) {
    var userInfo = publicUrl.globalData.userInfo;
    var that = this;
    var webpaids = [];
    var webtopaids = [];
    var webtocomms = [];
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0) {
      wx.request({
        url: url + '/weborders?userid=' + userInfo.id,
        data: {
        },
        header: {
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
        },
        success: function (res) {
          // console.log('success')
          // console.log(res.data)
          for (var i = 0; i < res.data.weborder.length; i++) {
            var webpaid = {
              address: res.data.weborder[i].address,
              toname: res.data.weborder[i].toname,
              items: res.data.weborder[i].items,
            }
            webpaids.push(webpaid)
          }
          that.setData({
            webpaids: webpaids.reverse(),
            webtopaids: webtopaids.reverse(),
          })
        }
      })
    } else if (e.detail.current == 1) {
      wx.request({
        url: url + '/weborders?userid=' + userInfo.id + '&status=待支付',
        data: {
        },
        header: {
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
        },
        success: function (res) {
          // console.log('success')
          // console.log(res.data)
          for (var i = 0; i < res.data.weborder.length; i++) {
            var webtopaid = {
              address: res.data.weborder[i].address,
              toname: res.data.weborder[i].toname,
              items: res.data.weborder[i].items,
            }
            webtopaids.push(webtopaid)
          }
          that.setData({
            webpaids: webpaids.reverse(),
            webtopaids: webtopaids.reverse(),
          })
        }
      })
    } else if (e.detail.current == 2) {
      wx.request({
        url: url + '/weborders?userid=' + userInfo.id + '&status=待评价',
        data: {
        },
        header: {
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
        },
        success: function (res) {
          // console.log('success')
          console.log(res.data)
          for (var i = 0; i < res.data.weborder.length; i++) {
            var webtocomm = {
              id: res.data.weborder[i].id,
              address: res.data.weborder[i].address,
              toname: res.data.weborder[i].toname,
              items: res.data.weborder[i].items,
            }
            webtocomms.push(webtocomm)
          }
          that.setData({
            webpaids: webpaids.reverse(),
            webtopaids: webtopaids.reverse(),
            webtocomms: webtocomms.reverse(),
          })
        }
      })
    }

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  pay: function (e) {
    var orderlist = [];
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }

  },
  nopay: function (e) {
    var orderlist = [];
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }

  },
  comment: function (e) {
    var orderlist = [];
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }

  },
  scroll: function (e) {
    // console.log(e)
    // console.log("===scrollHeight=" + e.detail.scrollHeight)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '易到购订单'
    })
    if (this.data.currentTab === options.current) {
      return false;
    } else {
      that.setData({
        currentTab: options.current
      })
    }
    var userInfo = publicUrl.globalData.userInfo;
    var gradpaids = [];
    var gradtopaids = [];
    var webpaids = [];
    var webtopaids = [];
    var items = [];
    var orderlist = []
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
    var gradpaids = [];
    var gradtopaids = [];
    var webpaids = [];
    var webtopaids = [];
    var orderlist = [];
    var webtocomms = [];
    wx.request({
      url: url + '/weborders?userid=' + userInfo.id,
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        // console.log('success')
        // console.log(res.data)
        //易到购已支付订单
        for (var i = 0; i < res.data.weborder.length; i++) {
          var webpaid = {
            address: res.data.weborder[i].address,
            toname: res.data.weborder[i].toname,
            items: res.data.weborder[i].items,
          }
          webpaids.push(webpaid)
        }
        that.setData({
          gradpaids: gradpaids,
          gradtopaids: gradtopaids,
          webpaids: webpaids.reverse(),
          webtopaids: webtopaids,
        })
      }
    })
    wx.request({
      url: url + '/weborders?userid=' + userInfo.id + '&status=待支付',
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        // console.log('success')
        // console.log(res.data)
        //易到Go待支付订单
        for (var i = 0; i < res.data.weborder.length; i++) {
          var webtopaid = {
            address: res.data.weborder[i].address,
            toname: res.data.weborder[i].toname,
            items: res.data.weborder[i].items,
          }
          webtopaids.push(webtopaid)
        }
        that.setData({
          gradpaids: gradpaids,
          gradtopaids: gradtopaids,
          webpaids: webpaids.reverse(),
          webtopaids: webtopaids.reverse(),
        })
      }
    })
    wx.request({
      url: url + '/weborders?userid=' + userInfo.id + '&status=待评价',
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        // console.log('success')
        // console.log(res.data)
        for (var i = 0; i < res.data.weborder.length; i++) {
          var webtocomm = {
            id: res.data.weborder[i].id,
            address: res.data.weborder[i].address,
            toname: res.data.weborder[i].toname,
            items: res.data.weborder[i].items,
          }
          webtocomms.push(webtocomm)
        }
        that.setData({
          webpaids: webpaids.reverse(),
          webtopaids: webtopaids.reverse(),
          webtocomms: webtocomms.reverse(),
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