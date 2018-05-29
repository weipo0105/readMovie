// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    movies:"",
    navigateTitle:""
  },

  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category){
      case "正在热映":
        var dataUrl = app.globalData.doubanBase+"/v2/movie/in_theaters";
       break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "top250":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    util.http(dataUrl, this.processDoubanData);
  },
  // processDoubanData:function(data){
  //   var that = this;
  //   wx.request({
  //     url: url,
  //     method: 'GET',
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     success: function (res) {
  //       that.processDoubanData(res.data, settedKey, categoryTitle);
  //     },
  //     fail: function (res) {

  //     }
  //   })
  // },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.covertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    }
    this.setData({
      movies:movies
    });
  },

  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }

})