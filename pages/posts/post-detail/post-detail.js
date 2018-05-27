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
    wx.showToast({
      title: postCollected?"收藏成功！":"取消成功！",
      duration:1000,
      icon:"success"
    });
    // wx.showModal({
    //   title:"收藏",
    //   content:"是否收藏该文章？",
    //   showCancel:"true",
    //   cancelText:"不收藏",
    //   cancelColor:"#333",
    //   confirmText: "收藏",
    //   confirmColor: "#405f80"
    // });
  },
  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success:function(res){
        // res.cancle,
        // res.tapIndex
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消?" + res.cancle+"现在无法实现分享功能"
        })
      }
    })
  }
})