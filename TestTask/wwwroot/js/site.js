(function () {
    'use strict';

    var app = new App();

    $(window).on('load', function () {
        app.controller.showAll();
    });
})();