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
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "public/javascripts/common.js",
          baseUrl: "public/javascripts",
          name: "../bower_components/almond/almond",
          include: "main",
          out: "build/javascripts/optimized.js"
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/css/optimized.css': ['public/bower_components/bootstrap/docs/assets/css/bootstrap.css', 
                                      'public/bower_components/bootstrap-datepicker/css/datepicker.css',
                                      'public/javascripts/watable/watable.css']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true,
           flatten: true,
           src: ['public/bower_components/bootstrap/docs/assets/img/glyphicons-halflings.png'], 
           dest: 'build/img/', 
           filter: 'isFile'}
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('deploy', ['requirejs', 'cssmin', 'copy']);
  grunt.registerTask('default', ['gjslint']);

};
