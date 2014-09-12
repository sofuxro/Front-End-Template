/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    clean       = require('gulp-clean');         // Removes files and folders



/*************************************************************************
* Deleting specific folder for each task
 *
 * return the stream so that gulp knows the clean task is asynchronous
 * and waits for it to terminate before starting the dependent one.
 ************************************************************************/

gulp.task('img-clean', function() {
    return gulp.src(config.img.dest, {read: false})
        .pipe(clean());
});

gulp.task('less-clean', function() {
    return gulp.src(config.less.dest, {read: false})
        .pipe(clean());
});

// in the current configuration (using modules with broserify) we don't add new files or delete ones
// without this manifesting inside the app.js so caught on save.
// therefore we don't need to clean the folder as there will only be one and just one file script.js
//gulp.task('js-clean', function() {});

gulp.task('html-clean', function() {
    return gulp.src(config.less.dest, {read: false})
        .pipe(clean());
});