module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sourceDir: 'src',
        buildDir: 'dist',

        banner: [
            '/**',
            ' * ResponsiveTest v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' *',
            ' * Test responsive layout',
            ' *',
            ' * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>',
            ' * @copyright   (c) 2013 Nguyen Huu Phuoc',
            ' * @license     MIT',
            ' */\n\n'
        ].join('\n'),

        copy: {
            main: {
                files: [
                    { cwd: '<%= sourceDir %>/img', src: '**', dest: '<%= buildDir %>/img', expand: true, flatten: true, filter: 'isFile' }
                ]
            }
        },

        cssmin: {
            minify: { expand: true, cwd: '<%= sourceDir %>/css/', src: ['*.css'], dest: '<%= buildDir %>/css/', ext: '.min.css' },
            add_banner: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/css/style.min.css': ['<%= sourceDir %>/css/style.css']
                }
            }
        },

        ngmin: {
            controllers: {
                src: ['<%= sourceDir %>/js/responsivetest.js'],
                dest: '<%= buildDir %>/js/responsivetest.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: ['<%= buildDir %>/js/responsivetest.js'],
                dest: '<%= buildDir %>/js/responsivetest.min.js'
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['copy', 'cssmin', 'ngmin', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
};
