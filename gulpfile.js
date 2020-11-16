'use strict';

global.$ = {
  path: {
    task: require('./gulp/paths/tasks.js')
  },
  gulp: require('gulp'),
  csso: require('gulp-csso'),
  del: require('del'),
  gp: require('gulp-load-plugins')(),
  babel: require('gulp-babel'),
  browserSync: require('browser-sync').create()
};
$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'foundation',
        'copy',
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));