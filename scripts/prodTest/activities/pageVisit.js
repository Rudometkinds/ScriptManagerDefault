"use strict";

(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();

    var module = {

        ready: function() {
            // get the information for the activity
            var user = {};
            var tags = {
                'pageId': window.location.pathname,
                'title': document.title
            };

            Breinify.plugins.activities.pageVisit(user, tags);
        }
    };

    api.addModule('pageVisit', module);
})();