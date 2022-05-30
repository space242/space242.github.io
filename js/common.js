$(function () {
    var situation = true;//大屏幕上的移动条的插入情况
    var $catalogue = $('.catalogue');
    var $leftMainBox = $('.left-main-box');
    var $leftArrow = $('.left-arrow');
    var $rightArrow = $('.right-arrow');
    var $myHobbyPicture = $('.myhobbypicture');
    var $myHobbyPictureli = $('.myhobbypicture li');
    var $myHobbyButton = $('div.myhobby-content>button');
    var index = 0;//当前hobby的按钮下标
    var $idolContent = $('.idolcontent');
    function topBar() {
        var w = document.documentElement.clientWidth;
        if (w > 900) {
            //console.log(w);
            if (situation == true) {
                $catalogue.css('display', '');//消除小屏幕时 隐藏菜单带来的显示问题
                $catalogue.prepend('<div id="top-bar"></div>')
                situation = false;//说明插入好了
                var $topBar = $('#top-bar');
                $catalogue.removeClass('catalogur-small');//先把小屏幕时期的样式去除
                $catalogue.addClass('catalogue-big');//恢复大屏幕时期的样式
                var firstWidth = $catalogue.children('.home').width();
                var firstleft = $catalogue.children('.home').position().left;
                //var firsttop = $catalogue.children('.home').position().top;
                $topBar.css({ 'position': 'absolute', 'width': firstWidth, 'height': '0.3rem', 'background': '#69e0ff' })
                $topBar.css({ 'top': '0', 'left': '0.6rem' })
                topBarMove();
            }
        } else if (w <= 900 && situation == false) {
            $('div').remove('#top-bar');
            $catalogue.removeClass('catalogue-big')//先把大屏幕的样式去除
            $catalogue.addClass('catalogue-small')//恢复小屏幕时的样式
            situation = true;
        }
    }
    topBar();
    $(window).resize(topBar);
    function topBarMove() {
        $catalogue.children('li').hover(function () {
            var newWidth = $(this).width();
            var newLeft = $(this).position().left;
            //console.log(newWidth);
            $('#top-bar').css({ 'left': newLeft, 'width': newWidth, 'transition': 'all .5s' })
        }, function () {
            var firstWidth = $catalogue.children('.home').width();
            $('#top-bar').css({ 'width': firstWidth, 'top': '0', 'left': '0.6rem' })
        })
    }
    //小屏幕时的隐藏菜单的回调函数
    $leftMainBox.click(function () {
        console.log('s');
        $catalogue.toggle();
    })

    //点击导航栏的移动函数
    $('.catalogue li').click(function () {
        var w = document.documentElement.clientWidth;
        var index = $(this).index() - 1;
        console.log(index);
        if (index >= 1 && w >= 900) {
            var currentLocation = $('div[index=' + index + ']').offset().top;
            $('html,body').stop().animate({
                scrollTop: currentLocation
            })
        } else if (w < 900) {
            index = index + 1;
            var currentLocation = $('div[index=' + index + ']').offset().top;
            $('html,body').stop().animate({
                scrollTop: currentLocation
            })
            $catalogue.toggle();
        }
    })

    //myhobby 点击右边箭头的移动
    $rightArrow.click(function () {
        nextPage(true);
    })
    //myhobby 点击左边箭头的移动
    $leftArrow.click(function () {
        nextPage(false);
    })
    //移动函数
    function nextPage(next) {
        var w = document.documentElement.clientWidth;
        var Time = 500;//一次翻页的时间
        var Item_time = 20;//单元移动的间隔时间
        var interValid;//平滑翻页定时器
        var imgCount = 5;//获取hobby图片的数量
        if (w > 450) {
            var Page_width = $myHobbyPictureli.width();//一次翻页的长度 换算成px
        } else if (w <= 450) {
            Page_width = 8 * w / 9;//一次翻页的长度 换算成px
        }
        var offset;//计算偏移量
        if (next === true) {
            offset = -Page_width;//向右边走
        } else if (next === false) {
            offset = Page_width;
        } else {
            offset = -(next - index) * Page_width;
        }
        //单位间隔的移动间距,相当于速度
        var ItemOffset = offset / (Time / Item_time);
        var currentLeft = $myHobbyPicture.position().left;//当前位置
        var targetLeft = currentLeft + offset;//目标位置
        if (interValid) {
            clearInterval(interValid);
        }
        interValid = setInterval(function () {
            currentLeft = $myHobbyPicture.position().left;
            var newLeft = currentLeft + ItemOffset;
            if ((offset < 0 && newLeft <= targetLeft) || (offset > 0 && newLeft >= targetLeft)) {
                newLeft = targetLeft;
            }
            if (newLeft == targetLeft) {
                clearInterval(interValid);
                if (newLeft == -(imgCount + 1) * Page_width) {//到达最右边,跳转到第二张
                    newLeft = -Page_width;
                } else if (newLeft == 0) {//到达最左边,跳转到第6张
                    newLeft = -(imgCount) * Page_Width
                }
            }
            $myHobbyPicture.css('left', newLeft);
        }, Item_time)

        
        updateButton(next);
        function updateButton(next){
            var targetIndex = 0;
            if(next === true){
                targetIndex = index + 1;
                if(targetIndex == imgCount){
                    targetIndex = 0;
                }
            }else if(next === false){
                targetIndex = index - 1;
                if(targetIndex == -1){
                    targetIndex = imgCount - 1;
                }
            }else{
                targetIndex = next;
            }
            $myHobbyButton.eq(index).removeClass('button-clicked');
            $myHobbyButton.eq(targetIndex).addClass('button-clicked');
            index =targetIndex;
        }
        
    }
    //屏幕重置后的$myHobbyPicture 的left重置
    $(window).resize(Resize)
    function Resize(){
        //console.log(index)
        $myHobbyPicture.css('left',-(index+1)*$myHobbyPictureli.width());
    }
    //点击按钮时 更新图片
    $myHobbyButton.click(function () {
        var targetIndex = $(this).index();
        //console.log(targetIndex);
        nextPage(targetIndex);
    })

    //myidol 手风琴效果
    $idolContent.click(function(){
        $idolContent.children('.idol-table').css('display','none')
        $idolContent.css('background-position','');
        $idolContent.removeClass('active');
        $(this).addClass('active');
        $(this).children('.idol-table').css('display','block')
        $(this).css('background-position','right bottom')
    })
})