/**
 * @author Yann Sagon (yann.sagon@unige.ch)
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gjslint: {
      options: {
        flags: [
          '--disable 220'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: ['public/javascripts/*.js',
              'public/javascripts/sbatchGenerator/jquery.unige.sbatchGenerator.js'
              ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gjslint');


  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
