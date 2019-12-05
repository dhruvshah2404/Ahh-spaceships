const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(dest('./dest/css'))
}

exports.css = css;