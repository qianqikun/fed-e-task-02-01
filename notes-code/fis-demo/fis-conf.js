fis.match('*.{js,scss,png}', {
    release: '/assets/$0'
})
fis.match('**/*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass')
}) 