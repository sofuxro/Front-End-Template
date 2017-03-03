/*************************************************************************
* DEPENDENCIES
 ************************************************************************/

var config      = require('./config.js'),          // getting the configuration (like: img.src, js.dest, etc)
    babelify     = require('babelify'),            // Javascript compiler that allows us to use ES6 before its supported by all browsers
    browserify   = require('browserify'),          // Organize your browser code and load modules installed by npm
    gulp         = require('gulp'),                // Gulp core
    gulp_eslint  = require('gulp-eslint'),         // Linter for ES6
    gutil        = require('gulp-util'),           // The gulp utility plugin
    uglify       = require('gulp-uglify'),         // obfuscation and minification
    buffer_vinyl = require('vinyl-buffer'),        // Convert streaming vinyl files to use buffers
    source_vinyl = require('vinyl-source-stream'); // Use conventional text streams for nicer interoperability with the existing npm stream ecosystem



/*************************************************************************
* The actual compilation process
 ************************************************************************/


gulp.task('eslint', function() {
    return gulp.src(config.js.watch)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(gulp_eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(gulp_eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        //.pipe(gulp_eslint.failAfterError());
});



gulp.task('js', ['eslint', 'jst'], function() {
        // boolean variable (from "gulp --production" which will provide true)
    var if_production = gutil.env.production,

        // watching the browserify doing its job
        bundler = function(src) {
            return browserify({
                // required watchify args
                cache: {}, packageCache: {},
                // Specify the entry point of your app
                entries: [src],
                // enable source map !!! ONLY IF in DEVELOPMENT
                debug: (if_production !== true)
            });
        },

        bundle_them = function() {
            // Notify that we rebundled
            gutil.log('JS is rebundling');

            return function() {
                for(var i = 0, len = config.js.files.length; i < len; i++) {
                    bundler(config.js.files[i].src)

                    .transform('babelify', {presets: ['es2015']})

                    // browserify doing its job
                    .bundle()

                    // on a javascript error this will catch it and it won't stop the watch (as would normaly do)
                    .on('error', gutil.log)

                    // use vinyl to make the stream gulp compatible
                    .pipe(source_vinyl(config.js.files[i].name))

                    // use vinyl to buffer the stream in preparation for uglify !!! ONLY IF in PRODUCTION else nothing
                    .pipe(if_production ? buffer_vinyl() : gutil.noop())

                    // obfuscation and minification !!! ONLY IF in PRODUCTION else nothing
                    .pipe(if_production ? uglify({ preserveComments: 'license' }) : gutil.noop())

                    // the final destination folder
                    .pipe(gulp.dest(config.js.files[i].dest));
                }
            }();
        };

    bundle_them();
});
