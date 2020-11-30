function $(selector){
    return document.querySelector(selector)
}

function $$(selector){
    return document.querySelectorAll(selector);
}

function width(){
    return document.documentElement.clientWidth;
}

function height(){
    return document.documentElement.clientHeight;
}

//轮播图
function createCarousel(carouselId, datas){
    //获取各种dom元素
var container = document.getElementById(carouselId);
var carouselList = container.querySelector(".g-carousel-list");
var indicator = container.querySelector('.g-carousel-indicator');
var prev = container.querySelector('.g-carousel-prev');
var next = container.querySelector('.g-carousel-next');


var len = datas.length;
//当前索引
var carIndex = 0;

//创建轮播图的各种元素
function createCarouselElements(){
    var listHtml = ''; //轮播图列表内部的html
    var indHtml = ''; //指示器内部的html
    for(var i = 0; i < len; i++){
        var data = datas[i];
        if(data.link){
            listHtml += `<li><a href='${data.link}' target=_blank><img src='${data.image}'></a></li>`
        } else{
            listHtml += `<li><img src='${data.image}'></li>`
        }
        indHtml += `<li></li>`
    }
    carouselList.style.width = `${datas.length}00%`
    carouselList.innerHTML = listHtml;
    indicator.innerHTML = indHtml
}
createCarouselElements()

//根据当前的索引，设置正确的状态

function setStatus(){
    //当前图片
    carouselList.style.marginLeft = -carIndex * width() + 'px';
    //设置指示器状态，取消之前选中的selected
    var prevIndicator = indicator.querySelector('.selected')
    if(prevIndicator){
        prevIndicator.classList.remove('selected');
    }
    indicator.children[carIndex].classList.add('selected')
    //设置前后按钮
    if(prev){
        if(carIndex === 0){
            //目前是第一张图
            prev.classList.add('disabled')
        }else{
            prev.classList.remove('disabled')
        }
    }
    if(next){
        if(carIndex === len-1){
            //目前是最后一张图
            next.classList.add('disabled');//添加不可用样式
        }else{
            next.classList.remove('disabled');//删除不可用样式
        }
    }

}
setStatus()

//上一个
function toPrev(){
    if(carIndex === 0){
        return //没有上一个
    }
    carIndex--;
    setStatus();
}

//下一个
function toNext(){
    if(carIndex === len - 1){
        return //没有下一个
    }
    carIndex++;
    setStatus();
}
//自动切换
//自动切换计时器
var timer = null;
function start(){
    if(timer){
        //已经在切换了
        return;
    }
    timer = setInterval(function(){
        carIndex++;
        if(carIndex === len){
            carIndex = 0;
        }
        
        setStatus()
    },2000)
}
start()
//停止自动切换
function stop(){
    clearInterval(timer);
    timer = null;
}
//事件
if(prev){
    prev.onclick = toPrev;
}
if(next){
    next.onclick = toNext;
}

//手指触屏事件
container.ontouchstart = function(e){
    //阻止事件冒泡，防止拖动到上下页
    e.stopPropagation();
    var x = e.touches[0].clientX; //记录按下横坐标
    stop();
    carouselList.style.transition = 'none';
    //手指按下时间，设置在短时间内快速滑动的效果
    var pressTime = Date.now();
    //监听移动事件
    container.ontouchmove = function(e){
        var dis = e.touches[0].clientX - x;
        carouselList.style.marginLeft = -carIndex * width() + dis + 'px';
    }
    //放手事件
    container.ontouchend = function(e){
        //计算拖动距离
        var dis = e.changedTouches[0].clientX - x;
        //启动计时器
        start()
        //加上过渡效果
        carouselList.style.transition = '';
        //不再监听移动事件
        container.ontouchmove = 'null';
        //滑动的时间
        var duration = Date.now() - pressTime;
        if(duration < 300){
            if(dis < -20 && carIndex < len - 1){
                toNext()
            }else if(dis > 20 && carIndex > 0){
                toPrev()
            }else{
                setStatus();
            }
        }else{
            if(dis < -width()/2 && carIndex < len - 1){
                toNext();
            }else if(dis > width()/2 && curIndex > 0){
                toPrev();
            }else{
                setStatus();
            }
        }   

    }
}
}

async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }


