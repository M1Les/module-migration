var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var glob = require('glob');


var sections = getSections();

gulp.task('default', [ 'index-html']);

gulp.task('index-html', [
    'app-ts',
    'data-services'
], function () {
    return gulp.src('src/index.html')
            .pipe(gulp.dest('./build'))
            .pipe($.htmlReplace({

                'sectionJS':
                    sections
                    .filter(function (section) {
                        return fs.existsSync('build/sections/' + section.section + '/scripts.js');
                    })
                    .map(function (section) {
                        return 'sections/' + section.section + '/scripts.js?rev=@@hash';
                    })
            }))
            .pipe($.revAppend())
            .pipe(gulp.dest('./build'));
});

gulp.task('data-services', function () {
    return gulp.src(['src/data-services/**/!(module)*.ts', 'src/data-services/**/module.ts', 'typings/**/*.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript({
                typescript: require('typescript'),
                sortOutput: true,
                noExternalResolve: false,
                target: "ES5",
                module: "system",
                moduleResolution: "node",
                allowJs: true
            }))
            .js
            .pipe($.concat('data-services.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./build'));
});


gulp.task('app-ts', function () {
    // var sectionModules =
    //     sections.map(function (section) { return ', "tad.sections.' + section.section + '"'; })
    //     .join('');

    return gulp.src(['src/app.ts', 'typings/**/*.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript({
                typescript: require('typescript'),
                sortOutput: true,
                noExternalResolve: false,
                target: "ES5",
                module: "system",
                moduleResolution: "node",
                allowJs: true
            }))
            .js
            .pipe($.concat('app.js'))
            .pipe($.sourcemaps.write())
            // .pipe($.replace(/angular\.module\('tad',\s*\[([^\]]*?)\]\)/, 'angular.module("tad", [$1' + sectionModules + '])'))
            .pipe(gulp.dest('./build'));
});

function getSections() {
    return [];
    var dirs = glob.sync('src/sections/*/');
    var sections =
        dirs.map(function (dir) {
            return {
                dir: dir,
                section: dir.replace(/src\/sections\/([^/]*?)\//, '$1')
            };
        });

    return sections;
}