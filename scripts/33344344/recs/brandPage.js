"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var $ = Breinify.UTL._jquery();

    var resourceFrameId = {
        'live': 'f30a10f8-35f8-4155-b2e5-bab8c2dd0851',
        'test': '72a80c3f-2c01-4a7a-8857-85a2ae3c325d'
    };

    var html = {
        'title': '<div class="row m-5 pl-2"><div class="col-lg-8 mx-auto text-center"><h1>&nbsp;</h1></div></div>',
        'items': '<div class="row align-items-center p-3"></div>',
        'item': '<div class="col-md-8 col-lg-4 p-4 m-auto text-center product"></div>'
    }

    var css = '' +
        '<style id="br-recs-style">' +
        '</style>';

    var module = {
        resource: null,
        resourceStatus: 'loading',
        recs: null,
        recsStatus: 'loading',

        ready: function () {

            // if we have a result and it's an error, we stop now
            if (this.resourceStatus === 'error') {
                return;
            }

            // we also want to make sure that we have a container
            var $container = $('.container.product-main');
            if ($container.length !== 1) {
                return;
            }

            // otherwise let's load the recommendations
            this.loadRecommendations();
        },

        determineForItems: function () {
            return $('.product-buy-container .product-buy').not('[data-br-rec="true"]')
                .map(function () {
                    return $(this).attr('data-mikmak-location')
                }).get();
        },

        determineBlockedItems: function (additionalBlockedItems) {

            // if we do not have the resource at this point we return additionalBlockedItems or null
            if (this.resourceStatus !== 'received') {
                return $.isArray(additionalBlockedItems) ? additionalBlockedItems : null;
            } else if (!$.isPlainObject(this.resource) ||
                !$.isPlainObject(this.resource.blockedItemsPerBrand)) {
                return $.isArray(additionalBlockedItems) ? additionalBlockedItems : null;
            }

            // determine the brand
            var brand = $('.product-main h1:first').text().toLowerCase();

            var blockedItems = this.resource.blockedItemsPerBrand[brand];
            if ($.isArray(blockedItems) && $.isArray(additionalBlockedItems)) {
                return $.merge(additionalBlockedItems.slice(), blockedItems);
            } else if ($.isArray(additionalBlockedItems)) {
                return additionalBlockedItems;
            } else if ($.isArray(blockedItems)) {
                return blockedItems;
            } else {
                return null;
            }
        },

        loadRecommendations: function () {
            var _self = this;

            // at this point we need the resource, if it's still loading we wait...
            if (this.resourceStatus === 'loading') {

                // check again in 50ms
                setTimeout(function () {
                    _self.loadRecommendations();
                }, 50);
                return;
            }

            var forItems = this.determineForItems();
            var blockItems = this.determineBlockedItems(forItems);

            Breinify.recommendation({}, {
                'numRecommendations': 3,
                'recommendationQueryName': 'Website - Brand',
                'namedRecommendations': ['brand-page-recs'],
                'recommendationForItems': forItems,
                'recommendationAdditionalParameters': {
                    'blockItems': blockItems
                }
            }, function (data, text) {

                if (!$.isPlainObject(data) || typeof data.statusCode !== 'number') {
                    _self.recsStatus = 'error';
                    _self.recs = null;
                } else if (data.statusCode === 200 && $.isArray(data.result)) {
                    _self.recsStatus = 'received';
                    _self.recs = data.result;

                    _self.render();
                } else if (data.statusCode === 7120) {
                    _self.recsStatus = 'control';
                    _self.recs = [];
                } else {
                    _self.recsStatus = 'error';
                    _self.recs = null;
                }
            });
        },

        render: function () {

            var recType = 'TEST';
            var widgetType = 'brand';
            var additionalTags = {
                widgetLabel: 'Web: Brand - Personalized Products',
                sourcePageId: window.location.pathname
            };

            var $container = $('.container.product-main');

            // add the hero if it's specified
            if ($.isPlainObject(this.resource) &&
                typeof this.resource.hero === 'string' &&
                this.resource.hero.trim()) {

                var $title = $(html.title);
                $title.find('h1')
                    .text(this.resource.hero);
                $container.append($title);
            }

            var $items = $(html.items);
            for (var i = 0; i < this.recs.length; i++) {

                // three items per items container
                if ($items === null || i % 3 === 0) {
                    $items = $(html.items);
                    $container.append($items);
                }

                var $rec = common.products.render(this.recs[i], html.item);
                if ($rec !== null) {
                    $items.append($rec);
                }
            }

            // add an activity for the buttons
            var $buttons = $items.find('.product-buy[data-br-rec="true"]');
            $buttons.click(function (e) {
                var $el = $(this);

                var user = {};
                var product = common.products.get($el);

                Breinify.plugins.activities.viewedProduct(product, user, {
                    productNames: product.name === null ? null : [product.name]
                });

                var position = $el.closest('.row')
                    .find('.product')
                    .index($el.closest('.product'));
                var tags = $.extend({}, additionalTags, {
                    recommendationType: recType,
                    widgetId: widgetType + '-' + position,
                    widgetType: widgetType,
                    widgetPosition: position,
                    productIds: [product.id]
                });

                Breinify.plugins.activities.generic('clickedRecommendation', user, tags);
            });

            // we have to rebind the mikmak things
            common.mikmak.reload($buttons);
        }
    };

    if (window.location.pathname.indexOf('/search') !== 0 &&
        window.location.pathname.match(/^\/[^\/]+\/?$/) !== null) {

        var frameId = Breinify.UTL.internal.isDevMode() ? resourceFrameId.test : resourceFrameId.live;

        Breinify.plugins.assets.textResource(frameId, function (error, data) {
            if (error !== null || data === null || !$.isPlainObject(data)) {
                module.resourceStatus = 'error';
                module.resource = null;
            } else {
                module.resourceStatus = 'received';
                module.resource = data;
            }
        });

        api.addModule('recsBrandPage', module);
    }
})();
