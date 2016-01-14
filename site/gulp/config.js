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
        files:      [
            {
           // the dot V     is mandatory (as the current folder) for browserify
                src: './dev/js/app.js',     // the source
                name: 'script.js',          // the final name (script.js, admin.js, etc)
                dest: public_html + 'js/'   // custom destination (public for script, but test for specs)
            },

            //{ src: './dev/js/tests/spec/spec.js', name: 'test.js', dest: 'dev/js/tests/' }
        ],

        watch:      'dev/js/**/*.js'
    },


    html: {
        jst_folder: 'dev/templates/',
        jst_src:    'dev/templates/**/*.html',
        jst_dest:   'dev/js'
    }
};
