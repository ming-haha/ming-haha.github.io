(function(){
    var carouselData = [
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
          },
          {
            image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
          },
          {
            image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
          },
          {
            image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
          },
          {
            image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
          },
          {
            image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
          },
    ];
    createCarousel("game-carousel", carouselData)

    var container = $('.game-container');
    container.ontouchstart = function(e){
        if(container.scrollTop >= 10){
            console.log(container.scrollTop)
            e.stopPropagation();
        }
    }
})()