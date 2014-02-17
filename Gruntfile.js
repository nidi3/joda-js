module.exports = function (grunt) {
    var JASMINE_DIR = 'test-jasmine',
        JASMINE_PORT = 9999,
        DIST_DIR = 'dist',
        SOURCES = ['src/DateTimeUtils.js', 'src/ISOChronology.js', 'src/DateTimeFormatter.js', 'src/DateTimeFormat.js', 'src/DateTimeFormatterBuilder.js',
            'src/localFactory.js', 'src/LocalDateTime.js', 'src/LocalDate.js','src/LocalTime.js'],

        browsers = [
            {browserName: "internet explorer", version: "6", platform: "XP"},
//            {browserName: "internet explorer", version: "7", platform: "XP"},
//            {browserName: "internet explorer", version: "8", platform: "XP"},
//            {browserName: "internet explorer", version: "9", platform: "windows 7"},
            {browserName: "internet explorer", version: "10", platform: "windows 7"},
            {browserName: "internet explorer", version: "11", platform: "windows 8.1"},
            {browserName: "firefox", version: "3.0", platform: "XP"},
            {browserName: "firefox", version: "4", platform: "os x 10.6"},
            {browserName: "safari", version: "5", platform: "os x 10.6"},
            {browserName: "googlechrome", version: "26", platform: "linux"}
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

        uglify: {
            dist: {
                files: {
                    'dist/joda-js.js': SOURCES
                },
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    wrap: 'jodajs'
                }
            },
            min: {
                files: {
                    'dist/joda-js.min.js': SOURCES
                },
                options: {
                    report: 'gzip',
                    wrap: 'jodajs'
                }
            }
        },

        watch: {
            dist: {
                files: 'src/*.js',
                tasks: 'dist'
            },
            test: {
                files: 'test/*.js',
                tasks: 'copy:test'
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
                    // 'http://127.0.0.1:' + JASMINE_PORT + '/' + JASMINE_DIR + '/SpecRunner2.html',
                    //'http://127.0.0.1:' + JASMINE_PORT + '/' + JASMINE_DIR + '/SpecRunner3.html'],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    browsers: browsers,
                    testname: "General tests",
                    tags: ["master"],
                    onTestComplete: function (result) {
                        result.result.logs.forEach(function (log) {
                            grunt.log.ok(JSON.stringify(log));
                        });
                    }
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
                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/*.spec.js']
//                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDate.spec.js', JASMINE_DIR + '/spec/LocalDateTime.spec.js', JASMINE_DIR + '/spec/DateTimeUtils.spec.js', JASMINE_DIR + '/spec/DateTimeFormatterBuilder.spec.js']
//                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDate.spec.js'],
//                    'test-jasmine/SpecRunner3.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDateTime.spec.js'],
//                    'test-jasmine/SpecRunner2.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/DateTimeUtils.spec.js', JASMINE_DIR + '/spec/DateTimeFormatterBuilder.spec.js']
                }
            }
        }

    });

    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    }

    grunt.registerTask('init', ['clean', 'bower:init']);
    grunt.registerTask('default', []);
    grunt.registerTask('dist', ['uglify:dist', 'uglify:min']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('test-prepare', ['init', 'dist', 'copy:jasmine', 'copy:test', 'sails-linker', 'connect']);
    grunt.registerTask('test-local', ['test-prepare', 'watch']);
    grunt.registerTask('test', ['test-prepare', 'saucelabs-jasmine']);
};
