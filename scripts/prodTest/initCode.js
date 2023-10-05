"use strict";

(function () {
    var $ = Breinify.UTL._jquery();
    window.$ = $;
    window.jQuery = $;

    var slickCss = document.createElement("link");
    slickCss.type = "text/css";
    slickCss.rel = "stylesheet";
    slickCss.href = "http://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";

    var slick = document.createElement("script");
    slick.type = "text/javascript";
    slick.src = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
    if($) {
        $("head").append(slickCss);
        $("body").append(slick);
    }

    Breinify.plugins._setConfig('journey', {
        'trackJourney': true,
        'trackAnchors': true
    });

    Breinify.plugins._setConfig('assets', {
        'observeImages': true,
        'observeDataTags': true
    });

    Breinify.plugins._setConfig('optStatus', {
        'tokenValidateOptCode': 'kJnVegZ8dzoUGRgJJTIOFCW8mu77KI51Run1XFPBrYCz~hnJmI4p8cn4Z7pc3wDprvjsFBBp9~Cfi~TH3Lf06Z-vsCz8u~qoP6p6kB7X4k1SzFbW2K3mxePuZPx1tWvekHds1--s~b1d1Ac~-xV0A--Ejp7KUHqakmjur9vIM2GWwOoLBq3QdJGs5ItCKeGVQ1yMnJNuySA0D8jdYAzeEdoEBHLFdggkE-CwYoqiXrqEKjVqLYrQh~B~UFSH7tq-',
        'tokenOptViaCode': 'kJnVegZ8dzoUGRgJJTIOFCW8mu77KI51Run1XFPBrYCz~hnJmI4p8cn4Z7pc3wDprvjsFBBp9~Cfi~TH3Lf06Z-vsCz8u~qoP6p6kB7X4k1SzFbW2K3mxePuZPx1tWvekHds1--s~b1d1Ac~-xV0A1nvvtZYq2qEmpUjslPaD1OzEkKmHIhurSqlh6Ubyo~LQ1yMnJNuySA0D8jdYAzeEdoEBHLFdggkE-CwYoqiXrqEKjVqLYrQh~B~UFSH7tq-'
    });
})();