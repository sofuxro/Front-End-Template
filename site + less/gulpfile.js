/**
* gulpfile.js
 *
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in gulp/tasks. Any files in that directory get
 * automatically required below.
 *
 * To add a new task, simply add a new task file that directory.
 * gulp/tasks/default.js specifies the default set of tasks to run
 * when you run `gulp`.
 */



/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./gulp/config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    gulp        = require('gulp'),               // Gulp core
    require_dir = require('require-dir');        // Node helper to require() directories.



/*************************************************************************
* INCLUDING ALL TASKS from the gulp/tasks folder, including subfolders
 ************************************************************************/

require_dir('./gulp/', { recurse: true });



/*************************************************************************
* TASKS
 ************************************************************************/

/**
*  DEVELOPMENT (by default when running 'gulp') giving   gutil.env.production FALSE
 *
 * PRODUCTION  (when running 'gulp --production') giving gutil.env.production TRUE
 */
//gulp.task('default', ['less', 'img', 'html']);
gulp.task('default', ['less', 'img', 'js', 'html'], function() {
    gulp.watch(config.less.src, ['less']);
    gulp.watch(config.img.src,  ['img']);
    //gulp.watch(config.js.src,   ['js']); // we don't need this because js uses watchify + browserfy
    gulp.watch(config.img.src,  ['img']);
});