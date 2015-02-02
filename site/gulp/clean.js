/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    del         = require('del'),                // Removes files and folders - if you want to delete outised files use clean({force: true})
    gulp        = require('gulp'),               // Gulp core
    gutil       = require('gulp-util');          // The gulp utility plugin



/*************************************************************************
* Deleting specific folder for each task
 *
 * return the stream so that gulp knows the clean task is asynchronous
 * and waits for it to terminate before starting the dependent one.
 ************************************************************************/

gulp.task('img-clean', function() {
    // !!! ONLY IF in PRODUCTION
    if(gutil.env.production === true) {
        // we use return to make the task synchronous
        return del([config.img.clean_dest], {force: true});
    }
});


gulp.task('less-clean', function(cb) {
    // !!! ONLY IF in PRODUCTION
    if(gutil.env.production === true) {
        // we use CallBack to make the task synchronous
        del([config.less.dest + '*.css'], {force: true}, cb);
    } else {
        cb();
    }
});


// in the current configuration (using modules with broserify) we don't add new files or delete ones
// without this manifesting inside the app.js so caught on save.
// therefore we don't need to clean the folder as there will only be one and just one file script.js
// gulp.task('js-clean', function() {});


gulp.task('html-clean', function() {
    // !!! ONLY IF in PRODUCTION
    if(gutil.env.production === true) {
        // we use return to make the task synchronous
        return del([config.html.dest + '*.html'], {force: true});
    }
});
