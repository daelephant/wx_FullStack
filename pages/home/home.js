// pages/home/home.js

import {Home} from 'home-model.js';
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  /**
   * 具体业务写在自定义方法里面
   */
  _loadData:function(){
    var id = 1;
    home.getBannerData(id,(res)=>{
      console.log(res);
      //dom
      //数据绑定
      this.setData({
        'bannerArr' : res
      });
    });//getBannerData是异步的方法，所以不能用赋值
    // console.log(data);

    home.getThemeData((res)=>{
      this.setData({
        'themeArr':res
      });
    });

    home.getProductsData((data)=>{
      this.setData({
        productsArr:data
      });
    });
  },
  // callBack:function(res){
  //   console.log(res);
  // },
  onProductsItemTap:function(event){
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    });
  }
})