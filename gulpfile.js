/* eslint-disable no-param-reassign */
const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib',
    es: 'es',
  },
  style: ['src/**/*.less', '!src/global.less'],
  styleScripts: ['lib/**/*.js'],
};

gulp.task('less', () => gulp.src(paths.style).pipe(less()).pipe(gulp.dest(paths.dest.lib)));

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其余组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其余组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
      .replace(/\/style\/?'/g, '/style/css\'')
      .replace(/\/style\/?"/g, '/style/css"')
      .replace(/\.less/g, '.css');
}

gulp.task('copyJs', () =>
  gulp
      .src(paths.styleScripts) // 待处理的目标目录下的所有js文件
      .pipe(babel())
      .pipe(
          through2.obj(function copy(file, encoding, next) {
            this.push(file.clone());

            if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
              const content = file.contents.toString(encoding);
              file.contents = Buffer.from(cssInjection(content));
              file.path = file.path.replace(/index\.js/, 'css.js');
              this.push(file);
            }

            next();
          }),
      )
      .pipe(gulp.dest(paths.dest.lib)));
