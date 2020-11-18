'use strict';

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src('./source/images/**/*.*')
        .pipe($.gulp.dest('./static/images'));
  });

  $.gulp.task('copy',
      $.gulp.parallel(
          'copy:image'
      ));
};