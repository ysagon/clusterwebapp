/**
 * @author Yann Sagon (yann.sagon@unige.ch)
 */

/**
 * @param {object} grunt the grunt object
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    execute: {
       options: {
          args: ['faq.md', 'faq.json']
       },
       target: {
          src: ['scripts/md2faq.js']
       }
    },
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
        src: ['*.js',
              'routes/*.js',
              'scripts/*.js',
              'public/javascripts/*.js',
              'public/javascripts/sbatchGenerator/jquery.unige.sbatchGenerator.js',
              'public/javascripts/sbatchGenerator/jquery.unige.faq.js',
              'public/javascripts/sbatchGenerator/faqdata.js'
              ]
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'public/javascripts/common.js',
          baseUrl: 'public/javascripts',
          name: '../bower_components/almond/almond',
          include: 'main',
          out: 'build/javascripts/optimized.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/css/optimized.css':
             ['public/bower_components/jquery-ui/themes/redmond/jquery-ui.min.css',
              'public/bower_components/bootstrap/dist/css/bootstrap.css',
              'public/bower_components/bootstrap-datepicker/css/datepicker.css',
              'public/javascripts/watable/watable.css']
        }
      }
    },
    shell: {
      make_bootstrap: {
         command: 'npm install; make',
         options: {
           stdout: true,
           execOptions: {
             cwd: 'public/bower_components/bootstrap/'
           }
         }
      }
    },
    bower: {
      install: {
      }
    },
    copy: {
      init: {
        files: [
          { expand: true,
            flatten: true,
            src: ['custom/variables.less'],
            dest: 'public/bower_components/bootstrap/less/'
          }
        ]
      },
      main: {
        files: [
          {expand: true,
           flatten: true,
           src: ['public/bower_components/bootstrap/docs/assets' +
                 '/img/glyphicons-halflings.png'],
           dest: 'build/img/',
           filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('provisionning', ['bower:install',
                                       'copy:init',
                                       'shell:make_bootstrap']);
  grunt.registerTask('production', ['requirejs',
                                    'cssmin',
                                    'copy:main',
                                    'execute']);
  grunt.registerTask('default', ['gjslint']);

};
