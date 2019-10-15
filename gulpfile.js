const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      babel = require('gulp-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create(),
      clean = require('gulp-clean');

const path = {
    build: {
        html: 'build',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
        // fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/index.js',
        style: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*'
        // fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/index.js',
        style: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*'
        // fonts: 'src/fonts/**/*.*'
    },
    clean: './build/'
};

// *********** CALLBACKS ***********//

const htmlBuild = () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html, {allowEmpty: true}));
};

const cleanBuild = () => {
    return gulp.src(path.clean,{allowEmpty: true, read: false})
        .pipe(clean());
};

const scssBuild = () => {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowsersList: ['>0,2%'],
            cascade: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
};

const jsBuild = () => {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path.build.js))
};
const imgBuild = () => {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
};


const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch(path.watch.html, htmlBuild).on('change', browserSync.reload);
    gulp.watch(path.watch.style, scssBuild).on('change', browserSync.reload);
    gulp.watch(path.watch.js, jsBuild).on('change', browserSync.reload);
    gulp.watch(path.watch.img, imgBuild).on('change', browserSync.reload);
    // gulp.watch(path.watch.fonts, fontsBuild).on('change', browserSync.reload);
};
// *********** TASKS ***********//
//task - метод gulp

gulp.task('htmlBuild', htmlBuild);
gulp.task('clean', cleanBuild);
gulp.task('babel', jsBuild);
gulp.task('scssBuild', scssBuild);
gulp.task('imgBuild', imgBuild);
gulp.task('sourcemaps', watcher);
gulp.task('build', gulp.series(
    cleanBuild,
    htmlBuild,
    scssBuild,
    jsBuild,
    imgBuild,
    watcher
));