/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    changed     = require('gulp-changed'),       // Detect whether files in the stream changed
    less        = require('gulp-less'),          // Less compiler
    minify_css  = require('gulp-minify-css'),    // CSS minifier (leaving the special comment)
    sourcemaps  = require('gulp-sourcemaps'),    // Inline maps are embedded in the source file
    gutil       = require('gulp-util');          // The gulp utility plugin



/*************************************************************************
* The actual compilation process
 *
 * @dependencies - it waits until less-clear its done removing the old style.css
 ************************************************************************/

gulp.task('less', ['less-clean'], function() {
    gulp.src(config.less.src)
        // will only provide (down the stream) the files
        // that have changed since the list time it was run
        .pipe(changed(config.less.dest))

        // start of the source map !!! ONLY IF in DEVELOPMENT else nothing
        .pipe((gutil.env.production !== true) ? sourcemaps.init() : gutil.noop())

        // less compiling
        .pipe(less())

        // on a less error this will catch it and it won't stop the watch (as would normaly happen)
        .on('error', gutil.log)

        // end of the source map !!! ONLY IF in DEVELOPMENT else nothing
        .pipe((gutil.env.production !== true) ? sourcemaps.write() : gutil.noop())

        // minifiction of the css !!! ONLY IF in PRODUCTION else nothing
        .pipe(gutil.env.production ? minify_css() : gutil.noop())

        // the final destination folder (where it will be written inside style.css)
        .pipe(gulp.dest(config.less.dest));
});