var postsData = require('../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.data.postList = postsData.postList;
    this.setData({ postList: postsData.postList});
  },

  onSwiperItemTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    });
  },

  onSwiperTap: function (event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    });
  }
})