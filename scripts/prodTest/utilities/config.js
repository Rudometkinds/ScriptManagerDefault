(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();

    var module = {
        pathConfig: {
            demoNamePrefix: 'general-demo-',
            queryNamePrefix: 'demo::general-demo-',
            matchers: {
                hash: /general-demo-[\d][?&hide=true]*/gm,
                hide: /&hide=true/,
                path: /general-demo-[\d]/
            }
        },
        carousel: {
            dots: false,
            infinite: true,
            arrows: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [{
                breakpoint: 1500, // < 1500px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 1024, // < 1024px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 800, // < 800px
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 671, // < 671px
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        }
    };

    api.addModule('config', module);
})();