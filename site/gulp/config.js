'use strict';

var public_html = 'public_html/';


module.exports = {
    less: {
        watch:      'dev/less/**/*.less',
        src:        'dev/less/*.less',
        dest:       public_html + 'css/'
    },

    img: {
        src:        'dev/img/**/*.*',
        dest:       public_html + 'img/',
        clean_dest: public_html + 'img/**/*.*',
    },

    js: {
        src:        ['./dev/js/app.js'], // list of sources     app.js,    admin.js
        names:      ['script.js'],       // list of final names script.js, admin.js
        dest:       public_html + 'js/'
    },

    html: {
        src:        'dev/*.html',
        dest:       public_html,
        jst_folder: 'dev/templates/',
        jst_src:    'dev/templates/**/*.html',
        jst_dest:   'dev/js'
    }
};
