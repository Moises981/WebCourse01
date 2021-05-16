const { series, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')

const css = () => {
    console.log('Compiling Sass')
    return src('src/scss/App.scss')
        .pipe(sass())
        .pipe(dest('./build/css'))
}

const minCss = () => {
    console.log('Compiling Sass')
    return src('src/scss/App.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
}

const watchFiles = () => {
    watch('src/scss/**/*.scss',minCss);
}

exports.css = css
exports.minCss = minCss
exports.watchFiles = watchFiles
