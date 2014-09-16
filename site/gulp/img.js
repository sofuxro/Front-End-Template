/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    changed     = require('gulp-changed'),       // Detect whether files in the stream changed
    imagemin    = require('gulp-imagemin'),      // Minify PNG, JPEG, GIF and SVG images
    gutil       = require('gulp-util');          // The gulp utility plugin



/*************************************************************************
* The actual compilation process
 *
 * @dependencies - it waits until clean its done removing the old files
 ************************************************************************/

 gulp.task('img', ['img-clean'], function() {
    //gulp.src('./dev/img/**/*.*')
    gulp.src(config.img.src)
        // will only provide (down the stream) the files
        // that have changed since the list time it was run
        .pipe(changed(config.img.dest))

        // Minify images (level 7, lower is too weak) !!! ONLY IF in PRODUCTION else nothing
        .pipe(gutil.env.production ? imagemin({optimizationLevel: 7}) : gutil.noop())

        // the final destination folder
        .pipe(gulp.dest(config.img.dest));
});