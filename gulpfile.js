const DIST_PATH = 'dist';

var gulp = require('gulp');
var watch = require('gulp-watch');
// var changed = require('gulp-changed');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task( 'watch', function() {
  gulp.watch( 'styles/**/*.scss', ['styles'] );
  gulp.watch( 'index.html', ['views'] );
  gulp.watch( 'js/**/*.js', ['scripts'] );
} );

gulp.task('connect', function () {
  connect.server({
    name: 'RS Slider',
    root: 'dist',
    port: 8001,
    livereload: { port: 37001 }
  });
});

gulp.task( 'views', function() {
  return gulp.src( 'index.html' )
    .pipe( gulp.dest( DIST_PATH) )
    .pipe( connect.reload() );        
} );

gulp.task( 'styles', function() {
  return gulp.src('styles/*')
    .pipe( sass() )
    .pipe( gulp.dest( DIST_PATH ) )
    .pipe( connect.reload() );
} );

gulp.task( 'scripts', function() {
  return gulp.src( 'js/**/*.js' ) 
    .pipe(babel({ 
      presets: ['env']
    }))
    .pipe( gulp.dest( DIST_PATH ) )
    .pipe( connect.reload() );
} );

gulp.task( 'build', ['views', 'styles', 'scripts'], function() {
  return 0;
} );

gulp.task( 'default', ['build', 'watch', 'connect'], function() {
  return 0;
} );

