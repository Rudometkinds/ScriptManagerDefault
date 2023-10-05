"use strict";

(function () {
    var $ = Breinify.UTL._jquery();

    var style = `<style>
        .br-category-title {
            color: #000000; 
            font-family: 'Poppins', Palatino, Georgia, serif;
        }
        .product-title {
            text-align: center;
        }
        .br-mw-200 {
            max-width: 250px !important;
        }
    </style>`;

    $('head').append(style);
})();