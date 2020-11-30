
var showPage = (function(){
    var pageIndex = 0; //当前显示页面
var pages = $$('.page-container .page');
var len = pages.length;
var nextIndex = null;

//静止时状态
function setStatic(){
    //静止状态时没有下一页
    nextIndex = null;
    //目前显示页面
    for(var i = 0; i < len; i++){
        var page = pages[i];
        if(i === pageIndex){
            page.style.zIndex = 1;
        }else{
            page.style.zIndex = 10;
        }
         //位置
        page.style.top = ( i - pageIndex ) *  height() + 'px';
    }
   
}
setStatic()

//移动中
function moving(dis){
    for(var i = 0; i < len; i++){
        var page = pages[i];
        if( i !== pageIndex){
            page.style.top = ( i - pageIndex ) * height() + dis + 'px';
        }
    }
    //分析下一页
    if(dis > 0 && pageIndex > 0){ //下一页准备向下移动
        nextIndex = pageIndex - 1;
    }else if(dis < 0 && pageIndex < len - 1){ //下一页准备向上移动
        nextIndex = pageIndex + 1;
    }else{
        nextIndex = null
    }
}

//移动完成，要先确定下一页的状态
function finishMove(){
    if(nextIndex === null){
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex]; // 下一个页面
    nextPage.style.transition = '.5s' 
    nextPage.style.top = 0;
    
    setTimeout(function(){

        pageIndex = nextIndex;
        nextPage.style.transition = '';
        setStatic()
    },500)
}

//添加事件,点击容器而不是整个document
var pageContainer = $('.page-container')
pageContainer.ontouchstart = function(e){
   //类似于mousedowm,表示手指按下
    var y = e.touches[0].clientY;
    //处理函数
    function handler(e){
        var dis = e.touches[0].clientY - y;
        if(Math.abs(dis) < 20){
            dis = 0;
        }
        moving(dis);
        //阻止事件的我默认行为
        if(e.cancelable){ //如果事件可以取消
            e.preventDefault(); //取消事件，阻止默认行为
        }
    }
    //手指按下，监听移动
    pageContainer.addEventListener('touchmove', handler,{
        passive: false //微信移动端z阻止事件默认行为
    })
    //手指松开，完成移动
    pageContainer.ontouchend = function(){
        finishMove();
        pageContainer.removeEventListener('touchmove', handler);//手指离开了，不用监听移动了
    }
}

//自动切换到某个板块
//index 索引
//疑难点：如果开始设置nextIndex = index;那么在当前页为第一页时，nextIndex = null会覆盖前面的值，
//走到finishMove时就直接被返回了，就不会出现动画效果
function showPage(index){
  var nextPage = pages[index];//下一个页面
  //下一个页面在当前页上面，则为-height（），提高页面转换速度
  if(index < pageIndex){
    nextPage.style.top = -height() + 'px';
    //下一个页面在当前页下面，则为height()
  }else if(index > pageIndex){
    nextPage.style.top = height() + 'px';
  }else{
    //下一个页面在当前页
    //如当前页为第一页的话
    if(pageIndex === 0){
        //目前是第一个页面
      pageIndex++; 
    }else{
      pageIndex--;
    }
    setStatic();//重新设置位置
  }
  //强行让浏览器渲染
  nextPage.clientHeight; //读取dom的尺寸和位置，会导致浏览器强行渲染
  nextIndex = index; //设置下一个页面索引
  finishMove()
}

return showPage;
})()
