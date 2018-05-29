var app = getApp();
Page({
  onLoad:function(event){

    var inTheatersUrl = app.globalData.doubanBase+"/v2/movie/in_theaters";
    var comingSoon = app.globalData.doubanBase +"/v2/movie/coming_soon";
    var top250 = app.globalData.doubanBase +"/v2/movie/top250";
    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoon);
    this.getMovieListData(top250);
  },
  getMovieListData:function(url){
    wx.request({
      url: url,
      
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        
      }
    })
  }
})