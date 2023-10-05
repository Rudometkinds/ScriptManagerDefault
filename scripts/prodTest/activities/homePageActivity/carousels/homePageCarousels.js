"use strict";
/*
*[CI-211] Demo [Carousel + Activities]
*   [CI-224] Control the recommendation order by hash
*   URL: https://youtrack.breinify.com/issue/CI-224
*
* URL: https://youtrack.breinify.com/issue/CI-211
* Customer URL: https://breinify-7115022.hs-sites.com/breinify-retail-demo?breinify=true
* */

(function () {
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var ajaxWatchDog = api.getModule('ajaxWatchDog');
    var dataConfig = api.getModule('dataConfig');
    var carousel = api.getModule('carousel');
    var initializationConfig = api.getModule('config');
    var $ = Breinify.UTL._jquery();

    var module = {
        ready: function () {
            var _self = this;

            var $carouselContainer = $('#personalized-carousels');
            var $spinner = _self.computeLoadingSpinner();

            var namedRecommendations = [{
                namedRecommendations: ['general-demo-1'],
                recommendationQueryName: 'demo::general-demo-1-wine'
            }, {
                namedRecommendations: ['general-demo-2'],
                recommendationQueryName: 'demo::general-demo-2-beer'
            }, {
                namedRecommendations: ['general-demo-3'],
                recommendationQueryName: 'demo::general-demo-3-spirits'
            },
            ];
            var liquorTypes = ['wine', 'beer', 'spirits', 'non-alcoholic'];
            $carouselContainer.append(`<div class='br-demo-loader-container'></div>`);
            $('.br-demo-loader-container').append($spinner);

            var recommendationConfig = dataConfig.recommendations.computeRecommendationContexts(namedRecommendations, liquorTypes);
            _self.initializeCarousel(recommendationConfig, $carouselContainer);
        },

        initializeCarousel: function (config, $carouselContainer) {
            var _self = this;
            if(window.location.pathname !== '/demo') return;
            common.productFeeds.retrieve(config, function (results) {

                $carouselContainer.find('.br-demo-loader-container').hide();
                carousel.computeCarouselLayouts($carouselContainer, results);
                //slick-slider
                var $cardContainer = $carouselContainer.find('.br-carousels').find('.slick-slider').find('.br-product-base');
                _self.attachClickEventToCard($cardContainer);
            });
        },
        attachClickEventToCard: function ($cardContainer) {
            Breinify.UTL.dom.addModification('clickedRecommendations::clickHomepageCarouselProduct', {
                selector: '#personalized-carousels',
                preCondition: function ($el) {
                    return $el.find('.br-carousels').find('.slick-slider').find('.br-product-base').length > 0;
                },
                modifier: function ($els) {
                    $cardContainer.click(function (event) {
                        var $ele = $(this);
                        var $target = $(event.target);

                        if ($target.data('click')) {
                            var tags = {};
                            var type = 'clickedRecommendation';
                            tags.productDescription = $ele.data('description');
                            tags.productImageUrl = $ele.data('productImageUrl');
                            tags.productName = $ele.data('name');
                            tags.productUrl = $ele.data('productUrl');
                            tags.position = $ele.data('id') + 1;
                            //tags.sku =  $ele.data('sku');

                            Breinify.plugins.activities.generic(type, {}, tags);
                        }
                    });
                }
            });

        },
        computeLoadingSpinner: function () {
            return '<span class="loader"></span>'
        }
    }


    api.addModule('homePageCarousels', module);
})();