// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用到的 API
const sass = require("sass")
const path = require("path")
const loadGruntTasks = require("load-grunt-tasks")


let config = {
    //default config
    build: {
        src: 'src',
        dist: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
            styles: 'assets/styles',
            scripts: 'assets/scripts/*.js',
            pages: '*.html',
            images: 'assets/images/',
            fonts: 'assets/fonts/'
        },
    }
}

module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            main: {
                files: [{
                    expand: true,
                    cwd: config.build.src,
                    src: '**/*.scss',
                    dest: config.build.dist,
                    ext: '.css',
                    extDot: 'first'
                }]
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: true
            },
            main: {
                files: [{
                    expand: true,
                    cwd: config.build.src,
                    src: '**/*.js',
                    dest: config.build.dist,
                    ext: '.js',
                    extDot: 'first'
                }]
            }
        },
        swig_it: {
            dev: {
                options: {
                    swigDefaults: {
                        allowErrors: false,
                        autoescape: true
                    },
                    data: {
                        menus: [
                            {
                                name: 'Home',
                                icon: 'aperture',
                                link: 'index.html'
                            },
                            {
                                name: 'Features',
                                link: 'features.html'
                            },
                            {
                                name: 'About',
                                link: 'about.html'
                            },
                            {
                                name: 'Contact',
                                link: '#',
                                children: [
                                    {
                                        name: 'Twitter',
                                        link: 'https://twitter.com/w_zce'
                                    },
                                    {
                                        name: 'About',
                                        link: 'https://weibo.com/zceme'
                                    },
                                    {
                                        name: 'divider'
                                    },
                                    {
                                        name: 'About',
                                        link: 'https://github.com/zce'
                                    }
                                ]
                            }
                        ],
                        pkg: require('./package.json'),
                        date: new Date()
                    }
                },
                src: [path.join(config.build.src, "**/*.html")],
                dest: config.build.dist
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: config.build.src,
                        src: ['**/*.{png,jpg,jpeg,gif}', '**/*.{eot,svg,ttf,woff}'],
                        dest: config.build.dist
                    },
                ]
            }
        },
        watch: {
            js: {
                files: [path.join(config.build.src, '**/*.js')],
                tasks: ['babel']
            },
            css: {
                files: [path.join(config.build.src, '**/*.scss')],
                tasks: ['sass']
            },
            html: {
                files: [path.join(config.build.src, '**/*.html')],
                tasks: ['swig_it']
            },
        }
    })
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)
    grunt.registerTask('default', ['sass', 'babel', 'swig_it', 'watch'])
    grunt.registerTask('swig', ['swig_it'])
    grunt.registerTask('copy', ['copy'])
    //自动加载所有的 grunt 插件中的任务
} 