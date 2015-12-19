﻿; (function () {
    "use strict";

    angular.module("jsnbt-meta", ['ngRoute'])
    .config(function ($routeProvider) {

        var TEMPLATE_BASE = jsnbt.constants.TEMPLATE_BASE;

        var router = new jsnbt.ViewRouter('meta', $routeProvider);

        router.when('/modules/meta', function (x) {
            x.section('meta');
            x.baseTemplate(TEMPLATE_BASE.settings);
            x.template('tmpl/meta/settings.html');
            x.controller('MetaController');
            x.scope({
                localization: true
            })
        });

    });

})();