'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');

function styles() {
    return gulp
        .src('app/sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/css'))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
}

function markup() {
    return gulp
        .src('dist/index.html')
        .pipe(livereload())
}

function scripts() {
    return gulp
        .src('app/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
}

function watch() {
    livereload.listen()
    gulp.watch('app/sass/**/*.scss', styles)
    gulp.watch('dist/**/*.html', markup)
    gulp.watch('app/js/**/*.js', scripts)
}

exports.default = watch;