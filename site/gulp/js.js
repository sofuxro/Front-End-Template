/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),          // getting the configuration (like: img.src, js.dest, etc)
    browserify   = require('browserify'),          // Organize your browser code and load modules installed by npm
    gulp         = require('gulp'),                // Gulp core
    gutil        = require('gulp-util'),           // The gulp utility plugin
    uglify       = require('gulp-uglify'),         // obfuscation and minification
    buffer_vinyl = require('vinyl-buffer'),        // Convert streaming vinyl files to use buffers
    source_vinyl = require('vinyl-source-stream'), // Use conventional text streams for nicer interoperability with the existing npm stream ecosystem
    watchify     = require('watchify');            // An alternative to gulp watch, better in the sense of using cache (only looking at changed files)



/*************************************************************************
* The actual compilation process
 ************************************************************************/

gulp.task('js', ['jst'], function() {
        // boolean variable (from "gulp --production" which will provide true)
    var if_production = gutil.env.production,

        // watching the browserify doing its job
        bundler = browserify({
            // required watchify args
            cache: {}, packageCache: {}, fullPaths: true,
            // Specify the entry point of your app
            entries: [config.js.src],
            // enable source map !!! ONLY IF in DEVELOPMENT
            debug: (if_production !== true)
        }),

        bundle_them = function() {
            // Notify that we rebundled
            gutil.log('JS is rebundling');

            return bundler
                // browserify doing its job
                .bundle()

                // on a javascript error this will catch it and it won't stop the watch (as would normaly do)
                .on('error', gutil.log)

                // use vinyl to make the stream gulp compatible
                .pipe(source_vinyl(config.js.name))

                // use vinyl to buffer the stream in preparation for uglify !!! ONLY IF in PRODUCTION else nothing
                .pipe(if_production ? buffer_vinyl() : gutil.noop())

                // obfuscation and minification !!! ONLY IF in PRODUCTION else nothing
                .pipe(if_production ? uglify() : gutil.noop())

                // the final destination folder
                .pipe(gulp.dest(config.js.dest));
        };


    // we only watch the files in development; in production we just process them
    if(if_production !== true) {
        // rebundle with watchify
        bundler = watchify(bundler);
        // when file change
        bundler.on('update', bundle_them);
    }

    return bundle_them();
});
