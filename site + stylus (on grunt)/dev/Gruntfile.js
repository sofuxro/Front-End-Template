'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            compile: {
                files: {
                    '../public_html/css/style.css': 'stylus/style.styl'
                }
            }
        },

        watch: {
            w_stylus: { files: 'stylus/**/*.styl', tasks: 'stylus' }
        }
    });

    // Loading NPM tasks
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', 'watch');
}