"use strict";

//文档加载后执行 fn
function ready(fn) {
    if (document.addEventListener) { 
        document.addEventListener('DOMContentLoaded', function () {
            //注销时间，避免重复触发
            // document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            fn(); //运行函数
        }, false);
    } else if (document.attachEvent) { //IE浏览器
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                // document.detachEvent('onreadystatechange', arguments.callee);
                fn(); //函数运行
            }
        });
    }
}

ready(function(){
    let toc = document.getElementById("toc");
    let title = document.getElementById("title");
    let style = window.getComputedStyle(toc)["display"];
    if(!toc || style == "none"){
        return;
    }
    window.title = true;
    window.addEventListener('scroll',
        function (e) {
            let scroll_height = window.scrollY;
            if (scroll_height > 200 && window.title) {
                window.title = false;
                title.style.bottom = '100%';
                toc.style.top = "1rem";
            } else if (scroll_height <= 200 && !window.title) {
                window.title = true;
                title.removeAttribute("style");
                toc.removeAttribute("style");
            }
        }
    );
})