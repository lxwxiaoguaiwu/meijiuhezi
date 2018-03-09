// pages/nopeople/winedetaile/winedetaile.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clientHeight:0,
    // winWidth: 0,
    // winHeight: 0,
    // tab切换  
    currentTab: true,
    currentTab1: false,
    currentTab2: false,
    showActionSheet: true,
    list:[],
    imglists:[],
    boxname:'',
    boxlng:'',
    boxlat:'',
    comments:[],
    categoryid: 0,
    bbitems:[],
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
      { code: 1201, value: '酒香馥郁', src: '/pages/images/1201.png',femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1202, value: '优雅醇厚', src: '/pages/images/1202.png', femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
      { code: 1203, value: '绵甜爽口', src: '/pages/images/1203.png',femaleco: 0, maleco: 0, allpeople: 0, percent: 0, },
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
    num: 1,  // 购买数量默认是1  
    minusStatus: 'disabled',  // 使用data数据对象设置样式名  
  },
  previewlmg:function(e){
    console.log(e)
    var url = e.currentTarget.dataset.url;
    var a = url.split();
    console.log(a)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: a // 需要预览的图片http链接列表
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
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    if (num < this.data.list.number) {
      num++;
    }else{
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
  },
  /* 返回首页事件 */
  gohomepage: function(){
    wx.navigateBack({
      delta: 2,
    })
  },
  /* 立即购买按钮点击事件 */
  saveOrder: function (event) {
    var that = this;
    wx.navigateTo({
      url: '/pages/nopeople/place/place?name=' + event.currentTarget.dataset.name.name + '&boxname=' + event.currentTarget.dataset.name.boxname + '&id=' + event.currentTarget.dataset.name.id + '&num=' + that.data.num + '&price=' + event.currentTarget.dataset.name.currprice * that.data.num + '&pic=' + event.currentTarget.dataset.name.asset,
    })
  },
  /* 立即购买出现弹窗事件 */
  viewFlowerArea: function (data) {

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
  deleteArea:function(){
    this.setData({
      showModalStatus2: false,
      isHidden: 2,
    })
  },
  /* 点击点评出现弹窗事件 */
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
  allComment: function (e) {
    console.log(e)
    var that = this;
    var alcrecords = [];
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
    this.setData({
      currentTab: false,
      currentTab1: false,
      currentTab2: true,
    })
  },
  choiceMap: function (res) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var boxlist = [];
    var imglists = [];
    var comments = [];
    var items = [];
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
    that.setData({
      boxname: options.boxname,
      boxlat: options.boxlat,
      boxlng: options.boxlng
    })
    wx.setNavigationBarTitle({
      title: '无人Go'
    })
    wx.request({
      url: url + '/gradgoods/'+options.id,
      data: {
        
      },
      header: {
        'Accept': "*/*",
      },
      success: function (res) {
        console.log(res.data)
        var list={
          id:res.data.id,
          asset: picUrl+res.data.asset,
          desc: res.data.desc,
          name:res.data.name,
          number: res.data.number,
          preprice: res.data.preprice,
          currprice: res.data.currprice,
          serial: res.data.serial,
          leibie: res.data.leibie,
          boxname: that.data.boxname
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
              hitems.push(comment)
            }
          }
          if (res.data.leibie == '白酒') {
            console.log(that.data.bitems)
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
              bbitems.push(comment)
            }
          }
          if (res.data.leibie == '洋酒') {
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
              yyitems.push(comment)
            }
          }
          if (res.data.leibie == '啤酒') {
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
              ppitems.push(comment)
            }
          }
        }
        that.setData({
          list: list,
          imglists: imglists,
          categoryid: res.data.id,
          comments: hitems,
          bcomments: bbitems,
          ycomments: yyitems,
          pcomments: ppitems,
          name: res.data.name,
        })
      }

    })
    
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
    this.setData({
      currentTab: true,
      currentTab1: false,
      currentTab2: false,
    })
  },
  swichNav1: function (e) {
    this.setData({
      currentTab: false,
      currentTab1: true,
      currentTab2: false,
    })
  },
  swichNav2: function (e) {
    var that = this;
    var alcrecords = [];
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
    this.setData({
      currentTab: false,
      currentTab1: false,
      currentTab2: true,
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '自定义转发标题',
      path: '/page/nopeople/winedetaile/winedetaile',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})