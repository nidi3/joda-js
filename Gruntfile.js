module.exports = function (grunt) {
    var JASMINE_DIR = 'test-jasmine',
        JASMINE_PORT = 9999,
        DIST_DIR = 'dist',

        browsers = [
            {browserName: "internet explorer", version: "6", platform: "XP"},
            {browserName: "internet explorer", version: "7", platform: "XP"},
            {browserName: "internet explorer", version: "8", platform: "XP"},
            {browserName: "internet explorer", version: "9", platform: "windows 7"},
            {browserName: "internet explorer", version: "10", platform: "windows 7"},
            {browserName: "internet explorer", version: "11", platform: "windows 8.1"},
            {browserName: "firefox", version: "3.0", platform: "XP"},
            {browserName: "firefox", version: "4", platform: "os x 10.6"},
            {browserName: "safari", version: "5", platform: "os x 10.6"},
            {browserName: "chrome", version: "26", platform: "linux"}
        ];


    grunt.initConfig({
        clean: {
            src: ['bower_components', DIST_DIR, JASMINE_DIR + '/spec', JASMINE_DIR + '/lib']
        },
        bower: {
            init: {
                options: {
                    copy: false
                }
            }
        },

        concat: {
            dist: {
                src: ['src/init.js', 'src/DateTimeUtils.js'],
                dest: DIST_DIR + '/joda-js.js'
            }
        },

        watch: {
            dist: {
                files: 'src/*.js',
                tasks: 'dist'
            }
        },

        connect: {
            server: {
                options: {
                    base: "",
                    port: JASMINE_PORT
                }
            }
        },

        'saucelabs-jasmine': {
            all: {
                options: {
                    urls: ['http://127.0.0.1:' + JASMINE_PORT + '/' + JASMINE_DIR + '/SpecRunner.html'],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    browsers: browsers,
                    testname: "General tests",
                    tags: ["master"]
                }
            }
        },

        copy: {
            jasmine: {
                expand: true,
                cwd: 'bower_components/jasmine/',
                src: 'lib/jasmine-core/*.*',
                dest: JASMINE_DIR
            },
            test: {
                expand: true,
                cwd: 'test/',
                src: '**/*.js',
                dest: JASMINE_DIR + '/spec/'
            }
        },

        'sails-linker': {
            defaultOptions: {
                options: {
                    startTag: '<!-- include spec files here... -->',
                    endTag: '<!-- end spec files -->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: JASMINE_DIR + '/'
                },
                files: {
                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/**/*.js']
                }
            }
        }

    });

    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    }

    grunt.registerTask('init', ['clean', 'bower:init']);
    grunt.registerTask('default', []);
    grunt.registerTask('dist', ['concat']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('test', ['init', 'dist', 'copy:jasmine', 'copy:test', 'sails-linker', 'connect', 'saucelabs-jasmine']);
};