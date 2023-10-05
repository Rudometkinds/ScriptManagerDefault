(function () {
    /*
    * Example data:
    * @productFeeds = [
    * {
    *   additionalData:{
    *           title: "Featured Spirits"
    *       }
    *   },
    *   result:{
    *       additionalData:{
    *           product::productDescription: @string,
    *           product::productImageUrl: @string,
    *           product::productName: @string
    *           product::productUrl: @string
    *       }
    *   }
    * }
    * ]
    * @containerPrefix:@string
    * */

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var $ = Breinify.UTL._jquery();

    var carouselConfig = {
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
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }

    var module = {
        computeConfig: function (defaultConfig, updatedConfig = {}) {
            return {...defaultConfig, ...updatedConfig}
        },
        computeCarouselLayouts: function ($carouselContainer, productFeeds, containerPrefix = 'br-carousel_', updatedConfig = {}) {
            var _self = this;
            if (!$.isArray(productFeeds)) return;
            if ($carouselContainer.find('#' + containerPrefix + 'br-products-container--carousel_id__0').length) return;

            $carouselContainer.append(`<div class='br-carousels'></div>`);
            var $productContainer = $carouselContainer.find('.br-carousels');

            productFeeds.forEach(function (productFeed, index) {
                var contexts = {result: [], additionalData: {}};
                if (common.utils.isObject(productFeed)) {
                    if (common.utils.isObject(productFeed.additionalData))
                        contexts.additionalData = productFeed.additionalData;
                    if ($.isArray(productFeed.result))
                        contexts.result = productFeed.result;
                }

                var id = containerPrefix + "carousel_id__" + index;
                var $sliderBaseWrapper = $('<div class="slider-base"></div>').attr('id', containerPrefix + 'slider-base-wrapper--' + id).appendTo($productContainer);
                $sliderBaseWrapper.append("<h3 class='product-title br-slick-title-color'><strong></strong></h3>");
                $sliderBaseWrapper.find('h3.product-title strong').text(contexts.additionalData.title);

                var $sliderContainer = $('<div></div>').attr('id', containerPrefix + 'br-products-container--' + id).appendTo($sliderBaseWrapper);
                $sliderContainer.append('<div class="slider__main br-inner-slider-container">' +
                    '  <div class="related-articles"></div>' +
                    '</div>')
                    .removeClass('slider-video')
                    .addClass('slider-related-articles');

                var $carouselArticles = $sliderContainer.find('.related-articles');
                contexts.result.map((feed, feedIndex) => {
                    if (common.utils.isObject(feed.additionalData)) {
                        var additionalData = common.productFeeds.computeProductContext(feed.additionalData);
                        return _self.computeSingleCard(additionalData, feedIndex);
                    }

                }).forEach(html => $carouselArticles.append(html));

                if (window.location && window.location.pathname === '/demo') {
                    _self.layoutProducts($carouselArticles, updatedConfig);
                }
            })
        },
        computeSingleCard: function (feedContext = {}, feedIndex) {
            if (!$.isPlainObject(feedContext)) return;
            var sku = '';
            var skuRegex = /sku:\d+/;
            if (typeof feedContext.productName === 'string' && skuRegex.test(feedContext.productName)) {
                var extract = skuRegex.exec(feedContext.productName);
                if ($.isArray(extract) && extract.length === 2) {
                    var skuWithNumber = extract[0];
                    if (typeof skuWithNumber === 'string') {
                        sku = skuWithNumber.replace(/[sku:]/g, '');
                    }
                }
            }

            return '<div class="br-product-base" data-id="' + feedIndex + '"' +
                'data-description="' + feedContext.productDescription + '" data-sku="' + sku + '" data-product-image-url="' + feedContext.productImageUrl + '" ' +
                'data-name="' + feedContext.productName + '" data-product-url="' + feedContext.productUrl + '"> ' +
                '<div class="br-product-container">' +
                '  <div class="br-product-gallery__image">' +
                '    <a href="' + feedContext.productUrl + '"><img data-click="true" src="' + feedContext.productImageUrl + '" alt="' + feedContext.productName + '" title="' + feedContext.productName + '"></a>' +
                '  </div>' +
                '  <div class="br-product-info">' +
                '    <div class="bv-inline-rating-container">' +
                '      <div data-bv-show="inline_rating" data-bv-productid="' + feedContext.bvProductId + '" data-bv-redirect-url="' + feedContext.skUrl + '"><div></div></div>' +
                '    </div>' +
                '    <!-- Product info-->' +
                '    <a href="' + feedContext.productUrl + '" class="br-product-name">' +
                '        <span data-click="true">' + feedContext.productName + '</span>' +
                '    </a>' +
                '    <div class="br-product-descriptions">' +
                '        <span class="truncate-overflow">' + feedContext.productDescription + '</span>' +
                '    </div>' +
                '    <div class="br-product-btn-container">' +
                '       <button class="br-add-to-cart" data-click="true">' +
                '           <span data-click="true">Add to Cart</span>'
            '       </button>' +
            '    </div>' +
            '</div>' +
            '</div>' +
            '</div>';
        },
        layoutProducts: function ($productsSlickContainer, updatedConfig) {
            var _self = this;
            var config = _self.computeConfig(carouselConfig, updatedConfig);
            // bind the buttons
            $productsSlickContainer.find('a.br-has-shops').click(function () {
                var $el = $(this);
                var $list = $el.parent().find('.purchase-dropdown__shoplist');

                var size = $list.attr('data-size');
                var duration = 200;
                if (typeof size === 'string' && size.match(/\d+/) != null) {
                    duration = Math.min(1000, parseInt(size) * duration);
                }

                if ($el.hasClass('is-active')) {
                    $el.removeClass('is-active');
                    $list.slideUp(duration);
                } else {
                    $el.addClass('is-active');
                    $list.slideDown(duration);
                }
            });

            // apply the layout
            if ($productsSlickContainer
                && $productsSlickContainer.length
                && (typeof window.$ === 'function'
                    && typeof window.$().slick === 'function')
                && window.$($productsSlickContainer)) {
                window.$($productsSlickContainer).slick(config);
            } else {
                if (common.utils.isTest()) {
                    if (typeof window.$ !== 'function') {
                        console.warn('JQuery is missing!');
                    } else if (typeof window.$().slick !== 'function') {
                        console.warn('Slick is missing!');
                    } else {
                        console.warn('Product list is empty!');
                    }
                }
            }
        },
    };


    api.addModule('carousel', module);
})();