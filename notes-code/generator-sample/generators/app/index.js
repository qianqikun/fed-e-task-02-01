const Generator = require('yeoman-generator')
module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname//appname 为项目文件夹名字
            }
        ]).then(answers => {
            this.answers = answers
        })
    }
    writing() {
        const tmpl = this.templatePath('bar.html')
        const output = this.destinationPath('bar.html')
        const context = this.answers
        this.fs.copyTpl(tmpl, output, context)

    }
}