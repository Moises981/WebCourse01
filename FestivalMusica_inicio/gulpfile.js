const { series, src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const sourcemap = require('gulp-sourcemaps')
const terser = require('gulp-terser-js')
const rename = require('gulp-rename')

const paths = {
    images: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

const jsScript = () => {
    return src(paths.js)
        .pipe(sourcemap.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemap.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/js'))
}

const css = () => {
    console.log('Compiling Sass')
    return src(paths.scss)
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemap.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/css'))
}

const minCss = () => {
    console.log('Compiling Sass')
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
}

const watchFiles = () => {
    watch(paths.scss, css);
    watch(paths.js, jsScript);
}

const imgMin = () => {
    return src(paths.images)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'Notified Image'
        }))
}

const webpVersion = () => {
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'Version Webp Image'
        }))
}


exports.css = css
exports.minCss = minCss
exports.webpVersion = webpVersion
exports.imgMin = imgMin
exports.watchFiles = watchFiles

exports.default = series(css, jsScript, webpVersion, imgMin, watchFiles)