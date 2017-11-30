import $ from 'jquery';
import '../css/reset.css';
import '../css/index.scss';


import '../../libs/js/flexbile/flexible_css.debug.js'
import '../../libs/js/flexbile/flexible.debug.js'
$(function () {
    var wrap = document.querySelector('.text-rotater__wrap');
    var texts = ['assets', 'scripts', 'images', 'styles'];
    var n = 0;
    setInterval(() => {
        wrap.className = 'text-rotater__wrap text-rotater--slide-up';
        setTimeout(function () {
            n++;
            wrap.className = 'text-rotater__wrap';
            wrap.children[0].innerHTML = texts[n];
            if (n == texts.length - 1) {
                wrap.children[1].innerHTML = texts[0];
                n = -1;
            } else {
                wrap.children[1].innerHTML = texts[n + 1];
            }
        }, 1000);
    }, 5000)

    $('.ow').on('click',function() {
        location.href = 'https://webpackjs.com/'
    })
    $('.github').on('click',function() {
        location.href = 'https://github.com/webpack/webpack'
    })
    $('.version').on('click',function() {
        location.href = 'https://github.com/webpack/webpack/releases'
    })
})