/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    fs          = require('fs'),                 // File system
    gulp        = require('gulp'),               // Gulp core
    jst_concat  = require('gulp-jst-concat'),    // HTML templates compiled into a single JST (javascript template function) file
    gutil       = require('gulp-util'),          // The gulp utility plugin
    slash       = require('gulp-slash');         // Converts windows path to unix



/*************************************************************************
* The template compilation into templates.js
 ************************************************************************/

gulp.task('jst', function() {
    // we check if the templates folder even exists
    if (fs.existsSync(config.html.jst_folder)) {
        return gulp.src(config.html.jst_src)
            // Converts windows path to unix
            .pipe(slash())

            .pipe(jst_concat('templates.js', {
                renameKeys: ['^.*templates\/(.*).html$', '$1']
            }))

            // on a less error this will catch it and it won't stop the watch (as would normaly happen)
            .on('error', gutil.log)

            .pipe(gulp.dest(config.html.jst_dest));
    } else {
        gutil.log('Templates folder doesn\'t exists');
    }
});
