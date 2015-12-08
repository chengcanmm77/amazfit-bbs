var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint=require('gulp-jshint');
var less = require('gulp-less');
var rev = require('gulp-rev-append');
var imagemin = require('gulp-imagemin');
var contentIncluder = require('gulp-content-includer');
var clean = require('gulp-clean');

gulp.task('html', function() {
    return gulp.src("./src/*.html")
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./build'));
});
// 
gulp.task('img', function(){
    return gulp.src('./src/img/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./build/img'));
})
// 
gulp.task('build-less',['cleanCSS'], function(){
    return gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css/'));
});

// 
gulp.task('stylesheets',['build-less'], function() {
    return gulp.src(['./build/css/*.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

// 
gulp.task('minifyjs',['cleanJS'], function() {
    return gulp.src('./src/js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});

// 
gulp.task('cleanCSS', function() {
  return gulp.src('./build/css/*.css', {read: false})
    .pipe(clean({force: true}));
});
// 
gulp.task('cleanJS', function() {
  return gulp.src('./build/js/main.min.js', {read: false})
    .pipe(clean({force: true}));
});

//
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['minifyjs']);
    gulp.watch('./src/less/*.less', ['stylesheets']);
    gulp.watch('./src/*.html', ['html']);
});

gulp.task('default',['watch']);