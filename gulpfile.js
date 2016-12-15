'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

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
    .pipe(concat("app.js"))  // combine the scripts to a file
    .pipe(gulp.dest("js"));   // put the file in the folder
});