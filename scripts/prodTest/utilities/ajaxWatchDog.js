"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();

    var module = {
        watcher: function () {
            var proxied = window.XMLHttpRequest.prototype.send;
            //https://api.breinify.com/activity
            $(document).bind("ajaxSend", function (event, request, settings) {
                console.log('ajaxSend event: ', event);
                console.log('ajaxSend request: ', request);
                console.log('ajaxSend settings: ', settings);
            }).bind("ajaxComplete", function (event, request, settings) {
                console.log('ajaxComplete event: ', event);
                console.log('ajaxComplete request: ', request);
                console.log('ajaxComplete settings: ', settings);
            });

            window.XMLHttpRequest.prototype.send = function () {
                var pointer = this
                var intervalId = window.setInterval(function () {
                    if (pointer.readyState != 4) {
                        return;
                    }
                    // if(pointer.readyState == 2) {
                    //
                    // }

                    clearInterval(intervalId);
                }, 1);
                return proxied.apply(this, [].slice.call(arguments));
            };
        }
    };

    api.addModule('ajaxWatchDog', module);
})();