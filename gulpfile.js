const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
let cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');


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
  return src('./src/js/*')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest('./dest/js'))
}
exports.css = css;
exports.images = images;
exports.js = js;