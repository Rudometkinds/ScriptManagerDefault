(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var $ = Breinify.UTL._jquery();


    var module = {
        computeCardLayouts: function (series) {
            if (!common.utils.isObject(series)) return;

            var _self = this;
            var title = series.title;
            var $container = $(`<div class="container"></div>`);

            $container.append(`<div class="row"><div class="col"><h3 class="br-text-center w-100 mb-5"><strong class="br-category-title">
                ${title}</strong></h3></div></div>`);
            var $cardsContainer = $(`<div class="row mt-5"></div>`).appendTo($container);
            _self.computeCardSeries($cardsContainer, series.seriesEntity);

            return $container;
        },
        computeCardSeries: function ($cardsContainer, series) {
            var _self = this;
            series.forEach(function (card, index) {
                var categories = common.utils.isObject(card.categories) ? card.categories : null;
                var segmentSettings = common.utils.isObject(card.segmentSettings) ? card.segmentSettings : null;

                if ($.isPlainObject(categories)) {
                    var $card = _self.computeCardEntity(categories, segmentSettings);
                    $cardsContainer.append($card);
                }
            });
        },

        computeCardEntity: function (categories, segmentSettings) {
            var path = $.isPlainObject(segmentSettings)
            && $.isArray(segmentSettings.urlPath) ? segmentSettings.urlPath[0] : '';

            return `<div class="col d-flex justify-content-center card-container">
                        <figure class="figure w-100 br-mw-200 flex-column">
                            <img src="${categories.image}" 
                                 class="br-img figure-img img-fluid rounded category-card cursor-pointer" 
                                 alt="${categories.text}" 
                                 data-id=${categories.id}
                                 data-url="${categories.url}"
                                 data-path=${path}
                                 />
                            <figcaption class="d-flex figure-caption w-100 justify-content-center"><h6 class="br-category-title">${categories.text}</h6></figcaption>
                        </figure>
                    </div>`;
        }
    };

    api.addModule('staticCardSeries', module);
})();