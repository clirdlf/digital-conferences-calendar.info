"use strict";

const del = require('del');
const gulp = require("gulp");
const merge = require("merge-stream");

const pkg = require('./package.json');

function clean() {
    return del(['./vendor/']);
}

function modules() {
    var fullcalendar_core = gulp.src(
        './node_modules/@fullcalendar/core/**/*',
    ).pipe(gulp.dest('./vendor/fullcalendar/core'));
    var fullcalendar_daydrid = gulp.src(
        './node_modules/@fullcalendar/daygrid/**/*',
    ).pipe(gulp.dest('./vendor/fullcalendar/daygrid'));
    var fullcalendar_gcal = gulp.src(
        './node_modules/@fullcalendar/google-calendar/**/*',
    ).pipe(gulp.dest('./vendor/fullcalendar/google-calendar'));
    var fullcalendar_list = gulp.src(
        './node_modules/@fullcalendar/list/**/*',
    ).pipe(gulp.dest('./vendor/fullcalendar/list'));
    var fullcalendar_list = gulp.src(
        './node_modules/@fullcalendar/bootstrap/**/*',
    ).pipe(gulp.dest('./vendor/fullcalendar/bootstrap'));

    return merge(fullcalendar_core, fullcalendar_daydrid, fullcalendar_gcal);
}

const vendor = gulp.series(clean, modules);

exports.vendor = vendor;
exports.clean = clean;
exports.default = vendor;