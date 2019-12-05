const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
let cleancss = require('gulp-clean-css');


function css() {
  return src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(dest('./dest/css'))
}

exports.css = css;