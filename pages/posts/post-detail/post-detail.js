var postsData = require('../../../data/posts-data.js');
Page({

  data: {

  },

  onLoad:function(option){
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId]; 
    //console.log(postData);
    this.setData({
      postData: postData
    });  
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected){
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      });
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }   
  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    //取反操作，收藏变未收藏，未收藏变收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新了文章是否收藏的缓存值
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定变量，切换图片
    this.setData({
      collected: postCollected
    });
  }
})