module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /templates\//
        },
        files: {
          'templates.js': 'templates/**/*.hbs'
        }
      }
    },
    
    watch: {
      emberTemplates: {
        files: 'templates/**/*.hbs',
        tasks: ['emberTemplates']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
 
  // Default task(s).
  grunt.registerTask('default', ['emberTemplates']);
};