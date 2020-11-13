'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: true,
      port: 9090,
      server: {
        baseDir: 'static'
      }
    });
    $.browserSync.watch('static', $.browserSync.reload);
  });
};