'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task("hello", function(){
    console.log("Hello");
});

gulp.task("default", ["hello"], function (){
    console.log("This is the default task");
});


//concatnate javascripts
gulp.task("concatScripts", function (){
    gulp.src([
        'js/script1.js', 
        'js/script2.js', 
        'js/script3.js']) //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(concat("app.js"))  // combine the scripts to a file
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('js'));   // put the file in the folder
});

//minify javascripts
gulp.task("minifyScripts", function (){
    gulp.src('js/app.js') //pipe is used for connecting methods
    .pipe(uglify())  // minify scripts to a file
    .pipe(rename('app.min.js')) //rename the file
    .pipe(gulp.dest('js'));   // put the file in the folder
});


//compile sass to css
gulp.task("compileSass", function (){
    gulp.src('scss/application.scss') //pipe is used for connecting methods
    .pipe(maps.init()) // create the maps
    .pipe(sass())  // compile sass
    .pipe(maps.write('./')) //write the map file where does the gulp.dest
    .pipe(gulp.dest('css'));   // put the file in the folder
});