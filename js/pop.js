var showPop = (function(){
    //初始化
function showPop(id){
    var container = $("#" + id);
    container.style.display = '';
    if(id === 'popVideo'){
        var video  = container.querySelector('video');
        console.log(video)
        video.play();
    }
    }
    
    //点击关闭按钮
    var closes = $$('.pop-close');
    var len = closes.length;
    for(var i = 0; i < len; i++){
        closes[i].onclick = function(){
            var container = this.parentElement.parentElement;
            container.style.display = 'none';
        }
    };
    
    //微信，QQ切换
    var popWx = $('.pop-wx') ;
    var popQq = $('.pop-qq');
    popWx.onclick = function(){
        popWx.classList.add('selected');
        popQq.classList.remove('selected')
    }
    popQq.onclick = function(){
        popQq.classList.add('selected');
        popWx.classList.remove('selected');
    };
    //关闭视频弹窗时，视频暂停
    var closeBtn = $('#popVideo .pop-close');
    closeBtn.addEventListener('click', function(){
        $('#popVideo video').pause();
    });

    return showPop;
})()

