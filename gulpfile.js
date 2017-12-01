"use strict";

var FolderBuildJs = 'project/build/assets/js',
    FolderBuildStyles = 'project/build/assets/styles',
    FolderBuildStylesLocal = 'project/build/assets/styles/local',
    FolderBuildStylesVendor = 'project/build/assets/styles/vendor',
    FolderBuildJsVendor = 'project/build/assets/js/vendor',
    FolderBuildJsLocal = 'project/build/assets/js/local',
    FolderBuildImages = 'project/build/assets/images',
    FolderBuildImagesIcons = 'project/build/assets/images/icons',
    FolderBuildImagesIconsSvg = 'project/build/assets/images/icons/svg',
    FolderBuildImagesIconsPng = 'project/build/assets/images/icons/png',
    FolderBuildImagesImg = 'project/build/assets/images/img',
    FolderBuildAssets = 'project/build/assets',
    FolderBuild = 'project/build';
var FolderPublicJs = 'project/public/assets/js',
    FolderPublicStyles = 'project/public/assets/styles',
    FolderPublicStylesLocal = 'project/public/assets/styles/local',
    FolderPublicStylesVendor = 'project/public/assets/styles/vendor',
    FolderPublicJsVendor = 'project/public/assets/js/vendor',
    FolderPublicJsLocal = 'project/public/assets/js/local',
    FolderPublicImages = 'project/public/assets/images',
    FolderPublicImagesIcons = 'project/public/assets/images/icons',
    FolderPublicImagesIconsSvg = 'project/public/assets/images/icons/svg',
    FolderPublicImagesIconsPng = 'project/public/assets/images/icons/png',
    FolderPublicImagesImg = 'project/public/assets/images/img',
    FolderPublicAssets = 'project/public/assets',
    FolderPublic = 'project/public';

var FolderProject = 'project',
    FolderTmp = 'tmp';

var gulp = require('gulp'),

    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    classPrefix = require('gulp-class-prefix'),

    //css
    autoprefixer = require('gulp-autoprefixer'),
    browserslist = require('browserslist'),
    cssnano = require('gulp-cssnano'),
    stylus = require('gulp-stylus'),
    uncss = require('gulp-uncss'),
    csslint = require('gulp-csslint'),
    discard_comments = require('postcss-discard-comments'),
    svgSprite = require('gulp-svg-sprite'),
    spritesmith = require('gulp.spritesmith'),
    //rename file
    rename = require('gulp-rename'),
    //html
    htmlhint = require('gulp-htmlhint'),
    jade = require('gulp-jade'),
    jadeGlobbing = require('gulp-jade-globbing'),
    //load
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    //js
    uglify = require('gulp-uglify'),
    concat_js = require('gulp-concat'),

    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify');
// функция livereload
gulp.task('connect', function() {
  connect.server({
    root: 'project/public',
    // port: 880,
    livereload: true
  });
});


gulp.task('BlocksProcession', function(){
	gulp.src('project/build/templates/blocks/*.jade')
		.pipe(jade({pretty: true}))
	  .pipe(gulp.dest('project/public/templates/blocks'))
    .pipe(connect.reload());
});
gulp.task('PagesProcession', function(){
  gulp.src('project/build/templates/pages/*.jade')
		.pipe(jade({pretty: true}))
	  .pipe(gulp.dest('project/public/templates/pages'))
    .pipe(connect.reload());
});
gulp.task('HtmlPagesProcession', function(){
  gulp.src('project/public/templates/pages/*.html')
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
    .pipe(connect.reload());
});
gulp.task('LocalCssProcession', function () {
    runSequence('LocalStylus', 'LocalCssAutoprefixer', 'LocalStylusMinify');
});
gulp.task('LocalStylus', function () {
  return gulp.src('project/build/assets/styles/local/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('project/public/assets/styles/local'))
});
gulp.task('LocalCssAutoprefixer', function () {
  return gulp.src('project/public/assets/styles/local/main.css')
    .pipe(autoprefixer([
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 1', // Firefox 24 is the latest ESR
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6']))
    // .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(gulp.dest('project/public/assets/styles/local'))
});
gulp.task('LocalStylusMinify', function () {
  return gulp.src('project/public/assets/styles/local/main.css')
    .pipe(cssnano())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('project/public/assets/styles/local'))
    .pipe(connect.reload())
});
gulp.task('CleanTmp', function () {
  return gulp.src('tmp/*')
  .pipe(clean());
});
gulp.task('MinIcons', function () {
  return gulp.src('project/public/assets/images/icons/png/unmin/*')
  .pipe(imagemin())
  .pipe(gulp.dest('project/public/assets/images/icons/png/min'));
});
gulp.task('SpriteIcons', function () {
  return gulp.src('project/public/assets/images/icons/png/min/*')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
  .pipe(gulp.dest('project/public/assets/styles/local'));
});
gulp.task('CleanIconsMin', function () {
  return gulp.src('project/build/assets/images/icons/png/min')
  .pipe(clean());
});
gulp.task('CleanImg', function () {
  return gulp.src('project/public/assets/images/img')
  .pipe(clean());
});
gulp.task('ImageMin',function(){
  return gulp.src('project/public/assets/images/img/unmin/*')
  .pipe(imagemin())
  .pipe(gulp.dest('project/public/assets/images/img/min'));
});
gulp.task('IconsProcession', function() {
  runSequence('MinIcons', 'SpriteIcons');
});
gulp.task('ImagesProcession', function() {
  runSequence('ImageMin');
});
gulp.task('BuildStyleLocal', function() {
  return gulp.src(FolderPublicStylesLocal+'/*.css')
    .pipe(gulpCopy('includes/assets/styles/local', {prefix: 6}));
});
gulp.task('BuildStyleVendor', function() {
  return gulp.src(FolderPublicStylesVendor+'/*.css')
    .pipe(gulpCopy('includes/assets/styles/vendor', {prefix: 6}));
});
gulp.task('BuildJsLocal', function() {
  return gulp.src(FolderPublicJsLocal+'/*.js')
    .pipe(gulpCopy('includes/assets/js/local', {prefix: 6}));
});



gulp.task('local-js-compress', function() {
  return gulp.src('project/public/assets/js/local/main.js')
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('project/public/assets/js/local'))
    .pipe(connect.reload());
});
gulp.task('local-js-concat', function() {
  return gulp.src('project/build/assets/js/local/*.js')
    .pipe(concat_js('main.js'))
    .pipe(gulp.dest('project/public/assets/js/local/'))
    .pipe(connect.reload());
});

gulp.task('build-style-local', function() {
  runSequence('BuildStyleLocal');
});
gulp.task('build-style-vendor', function() {
  runSequence('BuildStyleVendor');
});
gulp.task('build-style-all', function() {
  runSequence('BuildStyleLocal', 'BuildStyleVendor');
});
gulp.task('build-js-local', function() {
  runSequence('BuildJsLocal');
});

gulp.task('build-js-all', function() {
  runSequence('BuildJsLocal');
});

gulp.task('LocalJSProcession', function() {
    runSequence('local-js-concat', 'local-js-compress');
});
gulp.task('watch', function () {
  gulp.watch('project/build/assets/images/img/*',['ImagesProcession']),
  gulp.watch('project/build/assets/images/icons/png/*.png',['IconsProcession']),
  gulp.watch('project/build/templates/pages/*.jade',['PagesProcession']),
  gulp.watch('project/build/assets/styles/local/*.styl',['LocalCssProcession']),
  gulp.watch('project/build/assets/js/local/*.js',['LocalJSProcession']);
});
gulp.task('default', ['watch', 'connect']);
