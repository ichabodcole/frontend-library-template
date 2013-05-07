var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point){
  return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/**/*.html'],
      options: {
        reporter: 'Nyan',
        run: true
      }
    },
    coffee: {
      library: {
        files: {
          'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee'
        }
      },
      examples: {
        files: {
          'examples/js/lib/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee',
          'examples/js/application.js': 'examples/js/application.coffee'
        }
      }
    },
    uglify: {
      library: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    },
    regarde: {
      livereload: {
        files: ['examples/**/*.html', 'examples/**/*.js'],
        tasks: ['livereload']
      },
      compile: {
        files: ['**/*.coffee'],
        tasks: ['coffee']
      },
      min: {
        files: ['dist/<%= pkg.name %>.js'],
        tasks: ['uglify']
      },
      test: {
        files: ['test/spec/*.js'],
        tasks: ['mocha', 'livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          base: 'examples/',
          hostname: 'localhost',
          port: 9000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      },
      test: {
        options: {
          hostname: 'localhost',
          port: 9005,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['coffee', 'uglify', 'livereload-start', 'connect', 'regarde', 'mocha']);
};