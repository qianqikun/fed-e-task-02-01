// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用到的 API
const sass = require("sass")
const loadGruntTasks = require("load-grunt-tasks")
module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            main: {
                files: {
                    "dist/css/main.css": "src/scss/main.scss"
                }
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: true
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            },
        }
    })
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
    //自动加载所有的 grunt 插件中的任务
} 