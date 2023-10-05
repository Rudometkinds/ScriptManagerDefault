"use strict";

(function () {
    var $ = Breinify.UTL._jquery();

    var style = '<style>' +
        '.truncate-overflow { display: -webkit-box !important; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }' +
        '.additionalPar > .slider { z-index:0 }' +
        'div.br-carousels .br-slick-title-color { color: #0b547d !important;}' +
        '.slider-related-articles { margin-bottom: 1rem; }' +
        '.slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus { border: 0 !important; }' +
        'div.br-carousels .slick-arrow:before{ content: none !important; }' +
        'div.br-carousels .slider-related-articles { margin-bottom: 4rem; }' +
        'div.br-carousels .slick-arrow {background-size: 100% 100%; background-repeat: no-repeat; width: 40px; height: 40px; padding: 0 !important; font-size: 0 !important; border: 0 !important; position: absolute; top: 50%; background-color: transparent !important;}' +
        'div.br-carousels .slick-prev  { ' +
        'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjEiIGN5PSIyMSIgcj0iMjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNDQ0NDQ0MiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy43MDcxIDI3LjcwNzFDMjMuMzQ2NiAyOC4wNjc2IDIyLjc3OTQgMjguMDk1MyAyMi4zODcxIDI3Ljc5MDNMMjIuMjkyOSAyNy43MDcxTDE2LjI5MjkgMjEuNzA3MUMxNS45MzI0IDIxLjM0NjYgMTUuOTA0NyAyMC43Nzk0IDE2LjIwOTcgMjAuMzg3MUwxNi4yOTI5IDIwLjI5MjlMMjIuMjkyOSAxNC4yOTI5QzIyLjY4MzQgMTMuOTAyNCAyMy4zMTY2IDEzLjkwMjQgMjMuNzA3MSAxNC4yOTI5QzI0LjA2NzYgMTQuNjUzNCAyNC4wOTUzIDE1LjIyMDYgMjMuNzkwMyAxNS42MTI5TDIzLjcwNzEgMTUuNzA3MUwxOC40MTUgMjFMMjMuNzA3MSAyNi4yOTI5QzI0LjA2NzYgMjYuNjUzNCAyNC4wOTUzIDI3LjIyMDYgMjMuNzkwMyAyNy42MTI5TDIzLjcwNzEgMjcuNzA3MVoiIGZpbGw9IiMyMjIyMjIiLz4KPC9zdmc+Cg==");' +
        '   z-index: 100;' +
        '   left: -8px;' +
        '}' +
        'div.br-carousels .slick-next {' +
        '   background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjEiIGN5PSIyMSIgcj0iMjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNDQ0NDQ0MiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC4yOTI5IDE0LjI5MjlDMTguNjUzNCAxMy45MzI0IDE5LjIyMDYgMTMuOTA0NyAxOS42MTI5IDE0LjIwOTdMMTkuNzA3MSAxNC4yOTI5TDI1LjcwNzEgMjAuMjkyOUMyNi4wNjc2IDIwLjY1MzQgMjYuMDk1MyAyMS4yMjA2IDI1Ljc5MDMgMjEuNjEyOUwyNS43MDcxIDIxLjcwNzFMMTkuNzA3MSAyNy43MDcxQzE5LjMxNjYgMjguMDk3NiAxOC42ODM0IDI4LjA5NzYgMTguMjkyOSAyNy43MDcxQzE3LjkzMjQgMjcuMzQ2NiAxNy45MDQ3IDI2Ljc3OTQgMTguMjA5NyAyNi4zODcxTDE4LjI5MjkgMjYuMjkyOUwyMy41ODUgMjFMMTguMjkyOSAxNS43MDcxQzE3LjkzMjQgMTUuMzQ2NiAxNy45MDQ3IDE0Ljc3OTQgMTguMjA5NyAxNC4zODcxTDE4LjI5MjkgMTQuMjkyOVoiIGZpbGw9IiMyMjIyMjIiLz4KPC9zdmc+Cg==");' +
        '   z-index: 100;' +
        '   right: -8px;' +
        '}' +
        '.br-product-base { display: flex !important; justify-content: center !important; width: 100%; height: 490px; }' +
        '.slick-prev:before, .slick-next:before {color: #0b547d !important;}' +
        '.br-inner-slider-container { overflow:visible }' +
        '.br-product-info { text-align:left }' +
        'div.br-carousels .br-product-gallery__image { justify-content: center; display: flex;}' +
        '.br-product-gallery__image img { height: 168px; }' +
        'div.br-carousels .br-product-container { ' +
        '   background:#fff; ' +
        '   width: 90%; ' +
        '   border: 1px solid #ccc; ' +
        '   border-radius: 4px; ' +
        '   overflow: hidden;' +
        '   padding: 1rem;' +
        '   height: 480px;' +
        '}' +
        'div.br-carousels .br-product-name { ' +
        '   color: #222 !important; ' +
        '   font-weight: 600 !important;; ' +
        '   font-style: normal !important; ' +
        '   letter-spacing: .12px !important;' +
        '   font-size: 1rem !important;' +
        '   line-height: 24px; margin: 8px 2px !important; ' +
        '   overflow: hidden !important; ' +
        '   -webkit-box-orient: vertical !important; ' +
        '   -webkit-line-clamp: 2 !important; ' +
        '   display: -webkit-box !important; ' +
        '   word-break: break-word !important; ' +
        '   min-height: 48px !important;' +
        '   margin-bottom: 1rem !important;' +
        '}' +
        'div.br-carousels .br-product-descriptions {' +
        '   max-height: 200px;' +
        '   overflow: hidden;' +
        '   min-height: 140px;' +
        '}' +
        '.br-product-descriptions span {' +
        '   font-family: "acumin-pro",sans-serif; ' +
        '   font-style: normal;' +
        '   font-weight: 400; ' +
        '   font-size: .7rem; ' +
        '   line-height: 24px; ' +
        '   color: #5f5f5f; ' +
        '   margin: 10px 0 5px; ' +
        '   display: block; ' +
        '   letter-spacing: .2px;' +
        '}' +
        'div.br-carousels .br-product-btn-container {' +
        '   width: 100%;' +
        '   display: flex; ' +
        '   justify-content: center;' +
        '   }' +
        'div.br-carousels .br-add-to-cart {' +
        '   font-family: "acumin-pro",sans-serif; ' +
        '   font-style: normal; ' +
        '   font-weight: 700; ' +
        '   font-size: .7rem; ' +
        '   line-height: 24px; ' +
        '   letter-spacing: .2px;' +
        '   border-radius: 28px !important; ' +
        '   margin-top: 16px;' +
        '   cursor: pointer;' +
        '   background-color: #222 !important;' +
        '   white-space: nowrap;' +
        '   border: none;' +
        '   position: relative;' +
        '   bottom: 0;' +
        '}' +
        '@media only screen and (max-width:800px) {' +
        '   div.br-carousels .slider-related-articles {' +
        '       margin-bottom: 4rem;' +
        '   }' +
        '   div.br-carousels .slider-related-articles .br-inner-slider-container .slick-slider ul {' +
        '       height: 20px; display: flex; justify-content: center;' +
        '   }' +
        '   div.br-carousels .slider-related-articles ul.slick-dots button {' +
        '       padding: 5px!important; background-color: black !important; border: 0 !important; font-size: 0 !important; margin: 0 !important;' +
        '   }' +
        '   div.br-carousels .slider-related-articles ul.slick-dots li {' +
        '       display: inline-block !important; margin: 0.3rem !important;' +
        '   }' +
        '   div.br-carousels .br-product-btn-container {' +
        '       justify-content: center;' +
        '   }' +
        '   .br-product-gallery__image img { width: auto; margin: 0 auto;}' +
        '}' +
        '@media only screen and (max-width:670px) {' +
        '  div.br-carousels .br-product-base { height: auto; }' +
        '  div.br-carousels .br-product-container { display: inline-flex; padding-left: 0 !important;}' +
        '  div.br-carousels .br-product-gallery__image { width: 40%; display: flex; justify-content: center; padding: 1rem;}' +
        '  .br-product-gallery__image img { width: auto; height: auto; min-width: 90px;}' +
        '  div.br-carousels .br-product-info { width: 55%; }' +
        '  div.br-carousels .br-product-btn-container { justify-content: left; }' +
        '  div.br-carousels .br-add-to-cart { position: unset; line-height: 9px; font-size: .6rem;}' +
        '  div.br-carousels .br-product-container { height: 340px !important;}' +
        '}' +
        '</style>';

    var spinnerStyles = '<style>' +
        '.br-demo-loader-container {display: flex; width: 100%; justify-content: center; align-items: center; height: 500px;}' +
        '.loader { width: 100px; height: 100px; border-radius: 50%; display: inline-block; position: relative; border: 3px solid; border-color: #FFF #FFF transparent transparent; box-sizing: border-box; animation: rotation 1s linear infinite; } ' +
        '.loader::after, .loader::before { content: \'\'; box-sizing: border-box; position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; border: 3px solid; border-color: transparent transparent #0b547d #0b547d; width: 90px; height: 90px; border-radius: 50%; box-sizing: border-box; animation: rotationBack 0.5s linear infinite; transform-origin: center center; } ' +
        '.loader::before { width: 80px; height: 80px; border-color: #FFF #FFF transparent transparent; animation: rotation 1.5s linear infinite; } ' +
        '@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } ' +
        '@keyframes rotationBack { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }' +
        '</style>';

    $('head').append(style).append(spinnerStyles);
})();