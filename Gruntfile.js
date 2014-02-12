module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            src: ['bower_components', 'dist', 'test-jasmine/spec', 'test-jasmine/lib']
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
                dest: 'dist/joda-js.js'
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
                    port: 9999
                }
            }
        },

        'saucelabs-jasmine': {
            all: {
                options: {
                    urls: ["http://127.0.0.1:9999/test-jasmine/SpecRunner.html"],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    browsers: [
                        {
                            browserName: "firefox",
                            version: "19",
                            platform: "XP"
                        }
                    ],
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
                dest: 'test-jasmine'
            },
            test: {
                expand: true,
                cwd: 'test/',
                src: '**/*.js',
                dest: 'test-jasmine/spec/'
            }
        },

        'sails-linker': {
            defaultOptions: {
                options: {
                    startTag: '<!-- include spec files here... -->',
                    endTag: '  <!-- end spec files -->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: 'test-jasmine/'
                },
                files: {
                    'test-jasmine/SpecRunner.html': ['test-jasmine/spec/**/*.js']
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
    grunt.registerTask("full-test", ['dist', 'copy:jasmine', 'copy:test', 'sails-linker', 'connect', 'saucelabs-jasmine']);
};