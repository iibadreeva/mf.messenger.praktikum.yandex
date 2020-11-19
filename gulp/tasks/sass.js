'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/sass/*.scss')
        // .pipe($.gp.sourcemaps.init())
        .pipe($.gp.autoprefixer())
        .pipe($.gp.sassGlob())
        .pipe($.gp.sass())
        .on('error', $.gp.notify.onError({
          title: 'Style'
        }))
        // .pipe($.gp.concat('app.css'))
        // .pipe($.gp.csso())
        // .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest('./static/css'));
  });
};