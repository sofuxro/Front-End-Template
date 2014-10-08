module.exports = {
    less: {
        watch:      'dev/less/**/*.less',
        src:        'dev/less/*.less',
        dest:       'public_html/css/'
    },

    img: {
        src:        'dev/img/**/*.*',
        dest:       'public_html/img/'
    },

    js: {
        name:       'script.js',          // name of the destination bundled js file
        src:        './dev/js/app.js',
        dest:       './public_html/js/'
    },

    html: {
        src:        'dev/*.html',
        dest:       'public_html/',
        jst_folder: 'dev/templates/',
        jst_src:    'dev/templates/**/*.html',
        jst_dest:   'dev/js'
    }
};
