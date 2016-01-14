'use strict';



var spec = {
        models: require('./models.js'),
        views:  require('./views.js')
    };



document.addEventListener("DOMContentLoaded", function() {

    describe('Servers', function() {
        spec.models();

        spec.views();
    });

});