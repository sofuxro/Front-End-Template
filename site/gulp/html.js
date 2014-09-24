/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    changed     = require('gulp-changed'),       // Detect whether files in the stream changed
    minify_html = require('gulp-minify-html'),   // HTML minifier
    gutil       = require('gulp-util'),          // The gulp utility plugin
    w3cjs       = require('gulp-w3cjs');         // W3C HTML validator



/*************************************************************************
* The actual compilation process
 *
 * @dependencies - it waits until clean its done removing the old files
 ************************************************************************/

 gulp.task('html', ['html-clean'], function() {
    gulp.src(config.html.src)
        // will only provide (down the stream) the files
        // that have changed since the list time it was run
        .pipe(changed(config.html.dest))

        // minifiction of the html !!! ONLY IF in PRODUCTION else nothing
        // !! Only in personal project were we use this setup (gulp)
        //.pipe(gutil.env.production ? minify_html({empty:true}) : gutil.noop())

        // validating against w3c html validator
        .pipe(w3cjs())

        // on a less error this will catch it and it won't stop the watch (as would normaly happen)
        .on('error', gutil.log)

        // the final destination folder
        .pipe(gulp.dest(config.html.dest));
});
