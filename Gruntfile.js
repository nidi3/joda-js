module.exports = function (grunt) {
    var SRC_DIR = 'src/main/js',
        TEST_DIR = 'src/test/js',

        SOURCES = [SRC_DIR + '/Utils.js', SRC_DIR + '/DateTimeUtils.js', SRC_DIR + '/translations.js', SRC_DIR + '/DefaultChronology.js',
            SRC_DIR + '/DateTimePrinter.js', SRC_DIR + '/DateTimeFormat.js', SRC_DIR + '/DateTimeFormatterBuilder.js',
            SRC_DIR + '/localFactory.js', SRC_DIR + '/LocalDateTime.js', SRC_DIR + '/LocalDate.js', SRC_DIR + '/LocalTime.js',
            SRC_DIR + '/JsonFormatter.js'],

        OUT_DIR = 'target',
        JASMINE_DIR = OUT_DIR + '/jasmine',
        JASMINE_PORT = 9999,
        DIST_DIR = OUT_DIR + '/dist',
        COVERAGE_DIR = OUT_DIR + '/coverage',

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
            src: ['bower_components', OUT_DIR]
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
                    'target/dist/joda-js.js': SOURCES
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
                    'target/dist/joda-js.min.js': SOURCES
                },
                options: {
                    report: 'gzip',
                    wrap: 'jodajs'
                }
            }
        },

        watch: {
            dist: {
                files: SRC_DIR + '/*.js',
                tasks: 'dist'
            },
            test: {
                files: TEST_DIR + '/*.js',
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
            dist: {
                expand: true,
                cwd: SRC_DIR,
                src: 'translations_*.js',
                dest: DIST_DIR
            },
            jasmineLib: {
                expand: true,
                cwd: 'bower_components/jasmine/',
                src: 'lib/jasmine-core/*.*',
                dest: JASMINE_DIR
            },
            jasmine: {
                expand: true,
                cwd: 'src/test/jasmine',
                src: '*',
                dest: JASMINE_DIR
            },
            test: {
                expand: true,
                cwd: TEST_DIR + '/',
                src: '**/*.js',
                dest: JASMINE_DIR + '/spec/'
            },
            javaTest: {
                expand: true,
                cwd: TEST_DIR + '/',
                src: '*1to1.spec.js',
                dest: 'target/generated-sources/test/java/jodajs/',
                rename: function (dest, src) {
                    return dest + src.replace('1to1.spec.js', 'Test.java');
                },
                options: {
                    process: function (content, name) {
                        return 'package jodajs;\n' +
                            'import org.junit.Test;\n' +
                            'import java.util.Date;\n' +
                            'import static jodajs.TestUtils.*;\n' +
                            'import static jodajs.Expectation.*;\n' +
                            'import org.joda.time.format.DateTimeFormat;\n' +
                            'import org.joda.time.DateTimeUtils;\n' +
                            'public class ' + name.substring(name.lastIndexOf('/') + 1, name.length - 12) + 'Test{\n' +
                            content
                                .replace(/\ndescribe\(.*?\n/g, '')
                                .replace(/\n\s+describe\("(.+?)", function /g, '\n@Test public void $1')
                                .replace(/\n\s*it\(.*/g, '')
                                .replace(/\n    \}\);/g, '}')
                                .replace(/\}\);/g, '') +
                            '}';
                    }
                }
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
                    'target/jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/*.spec.js']
//                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDate.spec.js', JASMINE_DIR + '/spec/LocalDateTime.spec.js', JASMINE_DIR + '/spec/DateTimeUtils.spec.js', JASMINE_DIR + '/spec/DateTimeFormatterBuilder.spec.js']
//                    'test-jasmine/SpecRunner.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDate.spec.js'],
//                    'test-jasmine/SpecRunner3.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/LocalDateTime.spec.js'],
//                    'test-jasmine/SpecRunner2.html': [JASMINE_DIR + '/spec/*Utils.js', JASMINE_DIR + '/spec/DateTimeUtils.spec.js', JASMINE_DIR + '/spec/DateTimeFormatterBuilder.spec.js']
                }
            }
        },

        jasmine: {
            src: [SOURCES, SRC_DIR + '/translations_*.js', TEST_DIR + '/*Utils.js'],
            options: {
                specs: TEST_DIR + '/*.spec.js',
                helpers: [TEST_DIR + '/init.js'],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: COVERAGE_DIR + '/coverage.json',
                    report: COVERAGE_DIR,
                    thresholds: {
                        lines: 75,
                        statements: 75,
                        branches: 75,
                        functions: 90
                    }
                }
            }
        },

        exec: {
            maven: 'mvn test'
        }

    });

    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    }

    grunt.registerTask('init', ['clean', 'bower:init']);
    grunt.registerTask('default', []);
    grunt.registerTask('dist', ['copy:dist', 'uglify:dist', 'uglify:min']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('test-prepare', ['init', 'dist', 'copy:jasmineLib', 'copy:jasmine', 'copy:test', 'sails-linker', 'connect']);
    grunt.registerTask('test-local', ['test-prepare', 'watch']);
    grunt.registerTask('test-java', ['copy:javaTest', 'exec:maven']);
    grunt.registerTask('test', ['test-java', 'test-prepare', 'saucelabs-jasmine']);
};
