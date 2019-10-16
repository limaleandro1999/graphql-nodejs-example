/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['static'], () => {
    const tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('static', ['clean'], () => {
    return gulp.src(['src/**/*.json']).pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src('dist').pipe(clean());
});

gulp.task('build', ['scripts']);

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build']);
});

gulp.task('start-dev', ['watch'], done => {
    return nodemon({
        script: 'dist/index.js',
        ext: 'js json',
        env: { NODE_ENV: 'development' },
        done,
    });
});

gulp.task('default', ['watch', 'start-dev']);
