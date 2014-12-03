/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    less        = require('gulp-less'),          // Less compiler
    sourcemaps  = require('gulp-sourcemaps');    // Inline maps are embedded in the source file
    gutil       = require('gulp-util');          // The gulp utility plugin



/*************************************************************************
* The actual compilation process
 *
 * @dependencies - it waits until less-clear its done removing the old style.css
 ************************************************************************/

gulp.task('less', ['less-clean'], function() {
    gulp.src(config.less.src)

        // start of the source map !!! ONLY IF in DEVELOPMENT else nothing
        .pipe((gutil.env.production !== true) ? sourcemaps.init() : gutil.noop())

        // less compiling minification !!! ONLY IF in PRODUCTION
        .pipe(gutil.env.production ? less({compress: true}) : less())

        // on a less error this will catch it and it won't stop the watch (as would normaly happen)
        .on('error', gutil.log)

        // end of the source map !!! ONLY IF in DEVELOPMENT else nothing
        .pipe((gutil.env.production !== true) ? sourcemaps.write() : gutil.noop())

        // the final destination folder (where it will be written inside style.css)
        .pipe(gulp.dest(config.less.dest));
});