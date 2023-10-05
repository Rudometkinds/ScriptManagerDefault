(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var $ = Breinify.UTL._jquery();

    var module = {

        ready: function () {
            var _self = this;

            // make sure we are on the right page and are confgiured correctly
            if (window.location.pathname !== '/communication-unsubscribe') {
                return;
            }

            var $allLabels = $('.unsubscribe-container .unsubscribe-info-label');
            if (!Breinify.plugins.optStatus.hasValidTokens()) {

                // show the default page
                $allLabels.hide().filter('.unsubscribe-status-default').show();

                return;
            } else {

                // show the loading we get started
                $allLabels.hide().filter('.unsubscribe-status-loading').show();
            }

            // make sure we have a code
            var code = Breinify.UTL.loc.param('uc');
            if (!Breinify.plugins.optStatus.isValidCode(code)) {
                _self.renderInvalidCode(code);
                return;
            }

            Breinify.plugins.optStatus.validateOptCode(code, function (error, response) {
                _self.renderOptCode(code, response)
            });
        },

        renderInvalidCode: function (code) {
            $('.unsubscribe-container .unsubscribe-info-label')
                .hide()
                .filter('.unsubscribe-status-invalid-code')
                .show();
        },

        renderOptError: function (optInfo, error) {
            this.replace($('.unsubscribe-container .unsubscribe-info-label')
                .hide()
                .filter('.unsubscribe-failed'), optInfo)
                .show();
        },

        renderOptCode: function (code, optInfo) {
            var _self = this;

            var $allLabels = $('.unsubscribe-container .unsubscribe-info-label');
            var $infoLabel = $allLabels.filter('.unsubscribe-status-info');
            var $button = $infoLabel.find('.unsubscribe-action');

            // replace the text in the label
            this.replace($infoLabel, optInfo);

            // bind the click
            $button.click(function () {
                Breinify.plugins.optStatus.optViaCode(code, function (error, response) {
                    if (error !== null) {
                        _self.renderOptError(optInfo, error);
                    } else {
                        _self.renderOptSuccess(optInfo, response);
                    }
                });
            });

            $allLabels.hide();
            $infoLabel.show();
        },

        renderOptSuccess: function (optInfo, response) {
            this.replace($('.unsubscribe-container .unsubscribe-info-label')
                .hide()
                .filter('.unsubscribe-status-successful'), optInfo)
                .show();
        },

        replace: function ($label, optInfo) {
            $label.find('.replace-unsubscribe-email').text(optInfo.user);
            return $label;
        }
    };

    api.addModule('unsubscribe', module);
})();