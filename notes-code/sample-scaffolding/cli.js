#!/usr/bin/env node

//Node CLI 应用入口文件必须要有这样的文件头
//如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为755
//具体就是通过 chomd 755 cli.js 实现修改

//脚手架的工作过程
//1. 通过命令行交互询问用户问题
//2. 根据用户回答的结果生成文件

const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")
const ejs = require("ejs")

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name ?'
    }
]).then(anwsers => {
    //模板目录
    const tmplDir = path.join(__dirname, 'templates')
    //目标目录
    const destDir = process.cwd()

    //将模板目录下全部文件转换到目标文件
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})