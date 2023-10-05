"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();

    var module = {
        productFeeds: {
            attachUtm: function (url, utm) {

                var source = typeof utm.source === 'string' && utm.source.trim() !== '' ? utm.source : 'breinify';
                var medium = typeof utm.medium === 'string' && utm.medium.trim() !== '' ? utm.medium : 'carousel';
                var campaign = typeof utm.campaign === 'string' && utm.campaign.trim() !== '' ? utm.campaign : null;
                var content = typeof utm.content === 'string' && utm.content.trim() !== '' ? utm.content : null;

                var additional = $.isPlainObject(utm.additional) ? utm.additional : {};
                var additionalKeys = Object.keys(additional);

                var finalUrl;
                try {
                    var urlObj = new URL(url);
                    urlObj.searchParams.append('utm_source', source);
                    urlObj.searchParams.append('utm_medium', medium);

                    if (campaign !== null) {
                        urlObj.searchParams.append('utm_campaign', campaign);
                    }

                    if (content !== null) {
                        urlObj.searchParams.append('utm_content', content);
                    }

                    additionalKeys.forEach(k => {
                        urlObj.searchParams.append(k, additional[k]);
                    });

                    return urlObj.href;
                } catch (e) {
                    try {
                        return url + '?' +
                            additionalKeys.map(k => k + '=' + encodeURIComponent(additional[k])).join('&') +
                            (campaign === null ? '' : 'utm_campaign=' + encodeURIComponent(campaign) + '&') +
                            (content === null ? '' : 'utm_content=' + encodeURIComponent(content) + '&') +
                            'utm_source=' + encodeURIComponent(source) + '&' +
                            'utm_medium=' + encodeURIComponent(medium);
                    } catch (innerE) {
                        return url;
                    }
                }
            },
            createBrec: function (tags) {
                var user = Breinify.UTL.user.create();
                return Breinify.UTL.loc.createGetParameter({
                    'user': {
                        'additional': {
                            'identifiers': {
                                'schwarzkopfSessionId': user.sessionId,
                                'schwarzkopfBrowserId': user.additional.identifiers.browserId
                            }
                        }
                    },
                    'activity': {
                        'tags': $.isPlainObject(tags) ? tags : {}
                    }
                });
            },
            computeProductContext: function (product) {
                var productUrl = product['product::productUrl'];
                var productName = product['product::productName'];
                var productDescription = product['product::productDescription'];
                var productImageUrl = product['product::productImageUrl'];


                return {
                    productUrl: productUrl,
                    productName: productName,
                    productDescription: productDescription,
                    productImageUrl: productImageUrl
                }
            },
            retrieve: function (namedRecommendations, cb) {
                Breinify.recommendation({}, namedRecommendations, function (data, errorText) {
                    var error = null;
                    var recommendations = null;

                    if ($.isPlainObject(data) && $.isArray(data.results)) {
                        if (data.results.length > 0) {
                            cb(data.results);
                            return;
                        } else {
                            cb(null);
                        }
                    }

                    cb(null);
                });
            }
        },
        utils: {
            computeTarget: function ($container, target) {
                return $container.find(target);
            },
            collectTexts: function ($container, target, isMultiple) {
                var texts = '';
                if (isMultiple) {
                    $container.find(target).contents().filter(function (index, el) {
                        if ($(el).text())
                            texts += $(el).text() + ' ';
                    })
                    if (typeof texts === "string") texts = texts.trim();
                } else {
                    texts = $container.find(target).text().trim();
                }

                return texts === '' || !texts ? null : texts
                    .replace(/[’]/g, '\'')
                    .replace(/[—]/g, '-')
                    .replace(/[^\x00-\x7F]/g, '');
            },
            isObject: function (obj) {
                return (typeof obj === 'object' &&
                    obj !== null &&
                    !Array.isArray(obj))
            },
            convertArrayToObject: function (arr) {
                var rv = {};
                for (var i = 0; i < arr.length; ++i)
                    rv[i] = arr[i];
                return rv;
            },
            isTest: function () {
                return Breinify.UTL.internal.isDevMode();
            },
        }
    };

    api.addModule('common', module);
})();