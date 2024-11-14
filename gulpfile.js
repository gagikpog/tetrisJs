var gulp = require('gulp');
var replace = require('gulp-string-replace');

gulp.task('default', function () {
  return gulp
    .src('./dist/index.html')
    .pipe(replace('lang="ru"', 'lang="en"'))
    .pipe(replace('Классический тетрис онлайн — играйте бесплатно', 'Classic Tetris Online - Play free'))
    .pipe(replace('Классическая игра Тетрис онлайн для ПК и мобильных устройств. Загрузка не требуется. Установка PWA на ios или android. Оптимизировано для сенсорных экранов', 'Classic Tetris game online for PC and mobile devices. No download required. Installing PWA on ios or android. Optimized for touch screens'))
    .pipe(replace('Пауза', 'Paused'))
    .pipe(replace('Проигрыш', 'Game over'))
    .pipe(replace('Продолжить', 'Resume'))
    .pipe(replace('Новая игра', 'New game'))
    .pipe(replace('Очки', 'Points'))
    .pipe(replace('Очищено', 'Cleans'))
    .pipe(replace('Уровень', 'Level'))
    .pipe(replace('Следующее', 'Next'))
    .pipe(replace('webmanifest', 'webmanifest_en'))
    .pipe(gulp.dest('./dist/en/'));
});
