'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/sass/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/templates/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('foundation'));
  });
};