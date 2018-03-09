// pages/yidaogo/yidaodetaile/yidaodetaile.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [],
    clientHeight: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    list: [],
    imglists: [],
    comments: [],
    showActionSheet: true,
    num: 1,  // 购买数量默认是1  
    minusStatus: 'disabled',  // 使用data数据对象设置样式名 
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    hideCount: false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    hideCount: true,
    count: 0,
    needAni: false,
    hide_good_box: true,
    searchData: [],
    carnum: 0,
    alcrecords:[],
    items: [
      { code: 1001, value: '果味十足', src: '/pages/images/1201.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1002, value: '味道浓郁', src: '/pages/images/1202.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1003, value: '清新爽口', src: '/pages/images/1203.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1004, value: '口感饱满', src: '/pages/images/1204.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1005, value: '复杂平衡', src: '/pages/images/1205.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
    ],
    yitems: [
      { code: 1101, value: '口感浓烈', src: '/pages/images/1201.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1102, value: '柔和顺滑', src: '/pages/images/1202.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1103, value: '香气复杂', src: '/pages/images/1203.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1104, value: '色泽清澈', src: '/pages/images/1204.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1105, value: '回味悠长', src: '/pages/images/1205.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
    ],
    bitems: [
      { code: 1201, value: '酒香馥郁', src: '/pages/images/1201.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1202, value: '优雅醇厚', src: '/pages/images/1202.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1203, value: '绵甜爽口', src: '/pages/images/1203.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1204, value: '入口柔顺', src: '/pages/images/1204.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1205, value: '回味悠长', src: '/pages/images/1205.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
    ],
    pitems: [
      { code: 1301, value: '泡沫丰富', src: '/pages/images/1201.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1302, value: '酒体厚重', src: '/pages/images/1202.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1303, value: '口感清爽', src: '/pages/images/1203.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1304, value: '味道复杂', src: '/pages/images/1204.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1305, value: '苦中带甜', src: '/pages/images/1205.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
    ],
  },
  previewlmg: function (e) {
    console.log(e)
    var url = e.currentTarget.dataset.url;
    var a = url.split();
    console.log(a)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: a // 需要预览的图片http链接列表
    })
  },
  allComment: function (e) {
    var that = this;
    var alcrecords = [];
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      wx.request({
        url: url + '/alcrecords?categoryid=' + that.data.categoryid,
        data: {
        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.alcrecords.length;i++){
            var tagsc = res.data.alcrecords[i].tagsc
            var tagscArr = tagsc.split(',')
            console.log(tagscArr)
            var alcrecord = {
              name: res.data.alcrecords[i].username,
              asset: res.data.alcrecords[i].avatar,
              tagsc: tagscArr
            }
            alcrecords.push(alcrecord)
            console.log(alcrecords)
          }
          that.setData({
            alcrecords: alcrecords
          })
        }
      })
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  busAnimation: function () {
    that.setData({
      needAni: true
    });
    setTimeout(function () {
      that.setData({
        needAni: false
      });
    }, 500);
  },
  touchOnGoods: function (e) {
    console.log(e)
    this.finger = {}; var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;
    this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
    this.startAnimation();
    var searchData = wx.getStorageSync('winelist') || []
    console.log(searchData)
    searchData.push(this.data.list)
    wx.setStorageSync('winelist', searchData)
    console.log(searchData)
    this.setData({
      searchData: searchData,
      showModalStatus2: false,
    })
    console.log(this.data.searchData)
  },
  startAnimation: function () {
    var index = 0, that = this,
      bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    this.timer = setInterval(function () {
      index++;
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index >= 28) {
        clearInterval(that.timer);
        that.setData({
          hide_good_box: true,
          hideCount: false,
          count: that.data.count += 1
        })
      }
    }, 33);
  },
  // 点击购物车事件,跳转去结算页面
  toSettlement: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../../yidaogo/jiesuan/jiesuan?number=' + this.data.num,
    })
  },
  hideModal: function (event) {
    console.log(event)
    this.setData({
      showModalStatus: false,
    })
  },
  hideModa2: function (event) {
    console.log(event)
    this.setData({
      showModalStatus2: false,
    })
  },
  saveCar: function () {
    var that = this;
    that.setData({
      showModalStatus2: false,
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    console.log(this.data.num)
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    if (num < this.data.list.number) {
      num++;
    } else {
      wx.showToast({
        title: '已超出酒柜存储',
        icon: 'none',
        duration: 2000
      })
    }

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    console.log(this.data.num)
  },
  gohomepage: function () {
    console.log(111111111)
    wx.navigateBack({
      delta: 1
    })
  },
  saveOrder: function (event) {
    console.log(event)
    var that = this;
    wx.navigateTo({
      url: '/pages/yidaogo/place/place?name=' + event.currentTarget.dataset.name.name + '&leixing=one' + '&num=' + this.data.num + '&id=' + event.currentTarget.dataset.name.id + '&price=' + event.currentTarget.dataset.name.price * this.data.num + '&pic=' + event.currentTarget.dataset.name.asset,
    })

  },


  viewFlowerArea: function (data) {
    var that = this;
    var animation = wx.createAnimation({//动画
      duration: 500,//动画持续时间
      timingFunction: 'linear',//动画的效果 动画从头到尾的速度是相同的
    })
    animation.translateY(0).step()//在Y轴偏移tx，单位px

    this.animation = animation
    that.setData({
      showModalStatus: true,//显示遮罩       
      animationData: animation.export()
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
  },
  addCar: function (data) {
    console.log(data)
    var that = this;
    var animation = wx.createAnimation({//动画
      duration: 500,//动画持续时间
      timingFunction: 'linear',//动画的效果 动画从头到尾的速度是相同的
    })
    animation.translateY(0).step()//在Y轴偏移tx，单位px

    this.animation = animation
    that.setData({
      showModalStatus2: true,//显示遮罩       
      animationData: animation.export()
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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
            showModalStatus1: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus1: true
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      options: options
    })
    var imglists = [];
    this.busPos = {};
    this.busPos['x'] = app.globalData.ww - 45;
    this.busPos['y'] = app.globalData.hh - 125;
    console.log(options)
    wx.setNavigationBarTitle({
      title: '易到Go'
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });


    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    var alcrecords = [];
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      wx.request({
        url: url + '/alcrecords?categoryid=' + that.data.categoryid,
        data: {
        },
        header: {
          'Accept': "*/*",
        },
        success: function (res) {
          console.log(res.data)

          for (var i = 0; i < res.data.alcrecords.length; i++) {
            var tagsc = res.data.alcrecords[i].tagsc
            var tagscArr = tagsc.split(',')
            var alcrecord = {
              name: res.data.alcrecords[i].username,
              asset: res.data.alcrecords[i].avatar,
              tagsc: tagscArr
            }
            alcrecords.push(alcrecord)
            console.log(alcrecords)
          }
          that.setData({
            alcrecords: alcrecords
          })
        }
      })
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
    var imglists = [];
    var bbitems = [];
    var hitems = [];
    var yyitems = [];
    var ppitems = [];
    var comments = [];
    var bcomments = [];
    var ycomments = [];
    var ycomments = [];
    var pcomments = [];
    var categoryid = 0;
    var items = [];
    var hitems = [];
    var carnum = publicUrl.globalData.carnum;
    console.log(that.data.items)
    console.log('carnum=========' + carnum)
    wx.request({
      url: url + '/webgoods/' + that.data.options.id,
      data: {

      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        console.log(res.data)
        var list = {
          id: res.data.id,
          name: res.data.name,
          price: res.data.currprice,
          num: res.data.serial,
          yuanjia: res.data.preprice,
          asset: picUrl + res.data.asset,
          leibie: res.data.leibie,
          number: res.data.number
        }
        for (var i = 0; i < res.data.detailimgs.length; i++) {
          var imglist = {
            asset: picUrl + res.data.detailimgs[i].asset,
          }
          imglists.push(imglist);
        }
        if (res.data.comments.length != 0) {
          if (res.data.leibie == '红酒') {
            for (var i = 0; i < res.data.comments.length; i++) {
              var comment = {
                code: res.data.comments[i].code,
                femaleco: res.data.comments[i].femaleco,
                maleco: res.data.comments[i].maleco,
                allpeople: res.data.comments[i].femaleco + res.data.comments[i].maleco,
                percent: parseInt(res.data.comments[i].maleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100),
                nvpercent: parseInt(res.data.comments[i].femaleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100)
              }
              var items = that.data.items
              // console.log(items)
              hitems.push(comment)
              // console.log(items)
            }
          }
          if (res.data.leibie = '白酒') {
            for (var i = 0; i < res.data.comments.length; i++) {
              var comment = {
                code: res.data.comments[i].code,
                femaleco: res.data.comments[i].femaleco,
                maleco: res.data.comments[i].maleco,
                allpeople: res.data.comments[i].femaleco + res.data.comments[i].maleco,
                percent: parseInt(res.data.comments[i].maleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100),
                nvpercent: parseInt(res.data.comments[i].femaleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100)
              }
              var bitems = that.data.bitems
              // console.log(bitems)
              bbitems.push(comment)
              // console.log(bitems)
            }
          }
          if (res.data.leibie = '洋酒') {
            for (var i = 0; i < res.data.comments.length; i++) {
              var comment = {
                code: res.data.comments[i].code,
                femaleco: res.data.comments[i].femaleco,
                maleco: res.data.comments[i].maleco,
                allpeople: res.data.comments[i].femaleco + res.data.comments[i].maleco,
                percent: parseInt(res.data.comments[i].maleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100),
                nvpercent: parseInt(res.data.comments[i].femaleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100)
              }
              var yitems = that.data.yitems
              // console.log(yitems)
              yyitems.push(comment)
              // console.log(yitems)
            }
          }
          if (res.data.leibie = '啤酒') {
            for (var i = 0; i < res.data.comments.length; i++) {
              var comment = {
                code: res.data.comments[i].code,
                femaleco: res.data.comments[i].femaleco,
                maleco: res.data.comments[i].maleco,
                allpeople: res.data.comments[i].femaleco + res.data.comments[i].maleco,
                percent: parseInt(res.data.comments[i].maleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100),
                nvpercent: parseInt(res.data.comments[i].femaleco / (res.data.comments[i].femaleco + res.data.comments[i].maleco) * 100)
              }
              var pitems = that.data.pitems
              // console.log(pitems)
              ppitems.push(comment)
              // console.log(pitems)
            }
          }

        }
        that.setData({
          list: list,
          categoryid: res.data.id,
          name: res.data.name,
          imglists: imglists,
          comments: hitems,
          bcomments: bbitems,
          ycomments: yyitems,
          pcomments: ppitems,
        })
        // console.log(that.data.comments)
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