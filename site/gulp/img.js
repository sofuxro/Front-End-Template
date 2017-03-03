/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    imagemin    = require('gulp-imagemin'),      // Minify PNG, JPEG, GIF and SVG images
    gutil       = require('gulp-util');          // The gulp utility plugin



/*************************************************************************
* The actual compilation process
 *
 * @dependencies - it waits until clean its done removing the old files
 ************************************************************************/

gulp.task('img', ['img-clean'], function() {
    gulp.src(config.img.src)
        .pipe(gutil.env.production ? imagemin() : gutil.noop())

        // the final destination folder
        .pipe(gulp.dest(config.img.dest));
});