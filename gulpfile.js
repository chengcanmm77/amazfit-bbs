var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint=require('gulp-jshint');
var less = require('gulp-less');
var rev = require('gulp-rev-append');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

// 更新版本号
gulp.task('revHTML', function() {
    return gulp.src('./src/*.html')
        .pipe(rev())
        .pipe(gulp.dest('./build'));
});
// 
gulp.task('img', function(){
    return gulp.src('./src/img/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./build/img'));
})
// less解析
gulp.task('build-less',['cleanCSS'], function(){
    return gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css/'));
});

// 压缩、重命名css
gulp.task('stylesheets',['build-less','revHTML'], function() {
    return gulp.src(['./build/css/*.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

//压缩 js
gulp.task('minifyjs',['cleanJS','revHTML'], function() {
    return gulp.src('./src/js/*.js')      //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./build/js'))  //输出
});

// 清空css
gulp.task('cleanCSS', function() {
  return gulp.src('./build/css/*.css', {read: false})
    .pipe(clean({force: true}));
});
// 清空js
gulp.task('cleanJS', function() {
  return gulp.src('./build/js/main.min.js', {read: false})
    .pipe(clean({force: true}));
});

//监听
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['minifyjs']);
    gulp.watch('./src/less/*.less', ['stylesheets']);
    gulp.watch('./src/*.html', ['revHTML']);
});

gulp.task('default',['watch']);