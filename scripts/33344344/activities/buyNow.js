"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var $ = Breinify.UTL._jquery();

    var module = {

        ready: function () {

            var $buttons = $('.product-buy-container .product-buy').not('[data-br-rec="true"]');
            if ($buttons.length <= 0) {
                return;
            }

            // get the products from the buttons
            var products = $buttons.map(function () {
                return common.products.get($(this));
            }).filter(function () {
                return this !== null;
            }).get();

            // make sure we have any buttons
            if (!$.isArray(products) || products.length <= 0) {
                return;
            }

            var productIds = [];
            var productNames = [];
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                productIds.push(product.id);
                productNames.push(product.name);
            }

            // get the information for the activity
            var user = {};
            var tags = {
                'productIds': productIds,
                'productNames': productNames,
                'pageId': window.location.pathname,
                'title': document.title
            };

            Breinify.plugins.activities.generic('showedBuyNow', user, tags);

            // next bind the clicks
            $buttons.click(function() {
                var product = common.products.get($(this));
                Breinify.plugins.activities.viewedProduct(product, user, {
                    productNames: product.name === null ? null : [product.name]
                });
            });
        }
    };

    api.addModule('buyNow', module);
})();
