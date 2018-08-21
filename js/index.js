/**
 * Created by Administrator on 2018/8/12
 */
window.onload = function () {
    var getData = function (callback) {
        // 判断是否缓存了数据
        if (window.data) {
            callback && callback(window.data);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    window.data = this.responseText;
                    callback && callback(window.data)
                }
            };
            xhr.send();
        }
    };
    var render = function () {
        getData(function (data) {
            var isMobile = window.screen.width < 768 ? true : false;
            data = JSON.parse(data);
            var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
            var pointHtml = template('pointTemplate', {list: data});
            document.querySelector('.carousel-indicators').innerHTML = pointHtml;
            document.querySelector('.carousel-inner').innerHTML = imageHtml;
        })
    };
    /*var render = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var isMobile = window.screen.width < 768 ? true : false;
                data = JSON.parse(this.responseText);
                var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
                var pointHtml = template('pointTemplate', {list: data});
                document.querySelector('.carousel-indicators').innerHTML = pointHtml;
                document.querySelector('.carousel-inner').innerHTML = imageHtml;
            }
            console.log(data)
        };
        xhr.send();
    };*/
    render();
    window.onresize = function () {
        render();
    }


    /*滑动手势切换*/
    function handMove() {
        var banner = document.querySelector('.banner');
        var startX = 0;
        var distanceX = 0;
        var isMove = false;
        banner.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            $('.carousel').carousel('pause')
        });
        banner.addEventListener('touchmove', function (e) {
            distanceX = e.touches[0].clientX - startX;
            isMove = true;
        });
        banner.addEventListener('touchend', function () {
            $('.carousel').carousel('');
            if (isMove && Math.abs(distanceX) > 50){
                /*左滑动*/
                if (distanceX < 0){
                    $('.carousel').carousel('next');
                } else {
                    $('.carousel').carousel('prev');
                }
            }
            startX = 0;
            distanceX = 0;
            isMove = false;
        })
    }
    handMove();

    var initMobileTab = function () {
        var $navTabs = $('.product .nav-tabs');
        var width = 0;
        $navTabs.find('li').each(function (i, item) {
            var $liWidth = $(this).outerWidth(true);
            width += $liWidth
        })
        $navTabs.width(width);


        new IScroll($('.nav-tabs-parent')[0], {
            scrollX: true,
            scrollY: false,
            click: true
        });

        /**/
        document.querySelector('.nav-tabs-parent').addEventListener('touchmove',function(e){

            e.preventDefault();

        });
    }
    initMobileTab()


};