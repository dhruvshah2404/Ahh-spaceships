const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function css() {
  return src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(dest('./dest/css'))
}

function images() {
  return src('./src/images/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('./dest/images'))
}

function js() {
  return src(['./src/js/resources.js', './src/js/app.js', './src/js/engine.js'])
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('main.js'))
    .pipe(dest('./dest/js'))
    .pipe(uglify())
    .pipe(dest('./dest/js/'))
}

function copy() {
  return src('./index.html')
    .pipe(dest('./dest'))
}

function watchIt() {
  watch('./src/css/*', css);
  watch('./src/js/*', js);
}
exports.css = css;
exports.images = images;
exports.js = js;
exports.watch = watchIt;
exports.all = series(css, images, js, copy);