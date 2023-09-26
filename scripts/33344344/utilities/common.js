"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();

    var module = {

        mikmak: {

            /**
             * This method can be used to reload the mikmak bindings, e.g., if new DOM elements (buttons) are
             * added to the DOM-tree.
             *
             * @param $buttons this parameter is optional and can be passed in to ensure that the last click event
             *                 is bound to the window.mikmak_discover attribute, when clicked
             *
             */
            reload: function ($buttons) {
                var _self = this;

                // check if we have a popup rendered (otherwise the script didn't run)
                var $popup = $('#mikmak_embed__wrapper-main');
                if ($popup.length === 0) {
                    return;
                }

                // check if the popup is visible, if so just check again and see if the popup is closed
                if ($popup.is(':visible')) {
                    setTimeout(function () {
                        _self.reload($buttons);
                    }, 50);
                    return;
                }

                // remove the popup - this seems to be important otherwise a new incorrect popup is rendered
                $popup.remove();

                /*
                 * Get the brand and settings from the current script and remove the whole tag.
                 * The removal is not needed, but we want to clean-up and have only one tag in the code.
                 */
                var $mikmakScript = $('script[data-mikmak-brand]');
                var currentBrand = $mikmakScript.attr('data-mikmak-brand');
                var currentSrc = $mikmakScript.attr('src');
                var currentDefer = $mikmakScript.attr('defer');
                $mikmakScript.remove();

                /*
                 * Reset the false status of mikmak_discover. mikmak_discover seems to be set to the current event on
                 * every click. It is also checked somewhere within the library as information holder.
                 */
                window.mikmak_discover = false;

                /*
                 * The original code-snippets selects all the elements of the class mikmak-discover and sets
                 * the window.mikmak_discover to the click event. This is actually only needed to show a popup
                 * after a some rerunning of the script (at least we could not determine any other reason).
                 *
                 * So generally it seems not to be an import value to be set. We still do it by passing in the
                 * newly added buttons (as jquery instance - we allow any jquery here).
                 */
                if (typeof $buttons === "object" && $buttons !== null && $buttons['jquery']) {
                    $buttons.click(function (e) {
                        window.mikmak_discover = e.originalEvent;
                    });
                }

                /*
                 * Now everythign is cleaned up and we have to recreate the script, to re-trigger the binding.
                 * We reload the full script to be compatible when things change within the code snippet itself.
                 */
                var newScript = document.createElement('script');
                newScript.setAttribute('data-mikmak-brand', currentBrand);
                newScript.type = 'text/javascript';
                newScript.src = currentSrc;
                newScript.defer = currentDefer;
                document.body.appendChild(newScript);
            }
        },

        products: {

            map: function (rec) {
                if (rec === null || !$.isPlainObject(rec)) {
                    return null;
                }

                var data = rec.additionalData;

                var abv = Breinify.UTL.toNumber(data['product::abv']);
                abv = isNaN(abv) ? data['product::abv'] : abv + '% ABV';

                return {
                    id: rec.dataIdExternal,
                    url: data['product::productUrl'],
                    name: data['product::productName'],
                    description: data['product::productDescription'],
                    imgUrl: data['product::productImageUrl'],
                    mikmakUpcs: data['product::dataMikmakUpcs'],
                    abv: abv
                };
            },

            render: function (rec, wrapper) {
                var mappedRec = this.map(rec);

                var rawHtml = '' +
                    '<img class="product-image m-3" src="">' +
                    '<div class="product-abv">&nbsp;</div>' +
                    '<div class="product-summary">' +
                    '  <h4 class="product-title">&nbsp;</h4>' +
                    '  <p class="product-description">&nbsp;</p>' +
                    '  <div class="product-buy-container">' +
                    '    <div class="mikmak-discover product-buy btn btn-primary" data-br-rec="true" data-mikmak-upcs="" data-mikmak-location="">Buy Now</div>' +
                    '  </div>' +
                    '</div>';

                var $rec = $(wrapper).append(rawHtml);

                var description = mappedRec.description;
                if (description.length > 115) {
                    description = description.substring(0, 110) + '&hellip;';
                }

                var mikmakUpcs = mappedRec.mikmakUpcs;

                $rec.find('.product-image')
                    .attr('src', mappedRec.imgUrl);
                $rec.find('.product-abv')
                    .text(mappedRec.abv);
                $rec.find('.product-title')
                    .html(mappedRec.name);
                $rec.find('.product-description')
                    .html(description);
                $rec.find('.product-buy')
                    .attr('data-mikmak-location', mappedRec.id)
                    .attr('data-mikmak-upcs', mikmakUpcs);

                return $rec;
            },

            get: function ($buyNowButton) {

                var id = $buyNowButton.attr('data-mikmak-location');
                if (typeof id !== 'string' || id.trim() === '') {
                    return null;
                }

                var name = $buyNowButton
                    .closest('.product-summary')
                    .find('.product-title')
                    .text();
                name = typeof name === 'string' && name.trim() !== '' ? name : null;

                return {
                    id: id,
                    name: name
                };
            }
        }
    };

    api.addModule('common', module);
})();
