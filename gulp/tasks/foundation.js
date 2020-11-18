'use strict';

module.exports = function() {
  $.gulp.task('foundation', function() {
    return $.gulp.src('./source/js/**/*.js')
        // .pipe($.gp.sourcemaps.init())
        .pipe($.gp.concat('foundation.js'))
        // .pipe($.gp.babel({
        //   presets: ['@babel/env']
        // }))
        // .pipe($.gp.sourcemaps.write('.'))
        .pipe($.gulp.dest('./static/js'));
  });
};