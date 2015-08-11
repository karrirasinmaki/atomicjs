'use strict';

/**
 * Grunt setup
 */
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    project: {
      src: 'src',
      filename: 'atomic',
      dist: 'dist',
      test: 'test',
      core: ['<%= project.src %>/<%= project.filename %>.js']
    },

    banner: '/*! <%= pkg.title %> v<%= pkg.version %> | (c) <%= grunt.template.today(\'yyyy\') %> @munkychop | <%= pkg.homepage %> */\n',

    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= project.core %>'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jasmine : {
      src : 'src/**/*.js',
      options : {
        specs : 'test/**/*.js'
      }
    },

    uglify: {

      dev: {
        options: {
          compress: {
            'drop_console': true,
            'keep_fnames': true,
            'keep_fargs': true
          },
          mangle: false,
          beautify: true,
          banner: '<%= banner %>'
        },

        src: '<%= project.core %>',
        dest: '<%= project.dist %>/<%= project.filename %>.js'
      },
      dist: {
        options: {
          compress: {
            'drop_console': true
          },
          preserveComments: false
        },

        src: '<%= project.core %>',
        dest: '<%= project.dist %>/<%= project.filename %>.min.js'
      },
    },

    clean: {
      dist: [ 'dist' ]
      // test: [ '<%= project.test %>/<%= project.filename %>.js' ]
    },

    copy: {
      test: {
        src: '<%= project.src %>/<%= project.filename %>.js',
        dest: '<%= project.test %>/<%= project.filename %>.js'
      }
    },

    connect: {
      test: {
        options: {
          port: 9000,
          hostname: '*',
          open: true,
          keepalive: true,
          base: 'test'
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      js: {
        files: '<%= jshint.files %>',
        tasks: ['clean', 'jshint', 'uglify', 'jasmine'],
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'uglify',
    'jasmine'
  ]);

  grunt.registerTask('travis', [
    'jshint',
    'jasmine'
  ]);

};
