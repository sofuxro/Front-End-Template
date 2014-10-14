/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config       = require('./config.js'),        // getting the configuration (like: img.src, js.dest, etc)
    browser_sync = require('browser-sync'),       // synchronising URLs, interactions and code changes across multiple devices.
    gulp         = require('gulp');               // Gulp core


gulp.task('browser-sync', function() {
    browser_sync({
        // we are watching in gulpfile each set of files and if they change we reload the browserS (so we don't need the files list here)
//        files:          ['public_html/**/*.*'],
        logConnections: true,
        notify:         false,
        server: {
            baseDir: "./public_html/"
        }
    });
});





