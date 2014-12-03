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

var config       = require('./gulp/config.js'),   // getting the configuration (like: img.src, js.dest, etc)
//    browser_sync = require('browser-sync'),       // synchronising URLs, interactions and code changes across multiple devices.
    gulp         = require('gulp'),               // Gulp core
//    gutil        = require('gulp-util'),          // The gulp utility plugin
    require_dir  = require('require-dir');        // Node helper to require() directories.



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
/*gulp.task('default', ['less', 'img', 'js', 'html', 'browser-sync'], function() {
    // we only start watching in DEVELOPMENT mode;
    // in production we just make the final preparation for the shipping of the files
    if(gutil.env.production !== true) {
        // we watch all the less files, but we only process the main files: style.less
        gulp.watch(config.less.watch, ['less', browser_sync.reload]);

        gulp.watch(config.img.src,  ['img', browser_sync.reload]);

        gulp.watch(config.js.src,   ['js']);

        gulp.watch(config.html.src,  ['html', browser_sync.reload]);

        // html templates used in javascript
        gulp.watch(config.html.jst_src,  ['jst', browser_sync.reload]);
    }
});*/

gulp.task('default', ['less', 'img', 'js', 'html'], function() {
    // we only start watching in DEVELOPMENT mode;
    // in production we just make the final preparation for the shipping of the files
    if(gutil.env.production !== true) {
        // we watch all the less files, but we only process the main files: style.less
        gulp.watch(config.less.watch,    ['less']);

        gulp.watch(config.img.src,       ['img']);

        gulp.watch(config.js.src,        ['js']);

        gulp.watch(config.html.src,      ['html']);

        // html templates used in javascript
        gulp.watch(config.html.jst_src,  ['jst']);
    }
});
