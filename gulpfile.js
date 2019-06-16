// Inject dependencies
const // dev mode
  devBuild = true,
  // modules
  gulp = require("gulp"),
  newer = require("gulp-newer"),
  noop = require("gulp-noop"),
  htmlclean = require("gulp-htmlclean"),
  deporder = require("gulp-deporder"),
  sync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  terser = require("gulp-terser"),
  // folder paths
  src = "src",
  build = "build";

// HTML processing
function html() {
  return gulp
    .src(src + "/html/**/*") // traži u folderu html sve fajlove i datoteke po čitavoj dubini
    .pipe(newer(build)) // pipe povezuje naredbe - treba paziti na redoslijed; provjerava je li kod u source-u različit od onog u build-u; ako je različit, ide dalje
    .pipe(devBuild ? noop() : htmlclean()) // nemoj čistiti html, ako smo u development modu
    .pipe(gulp.dest(build)) // zadnji pipe je destination
    .pipe(sync.stream());
}

// CSS processing
function css() {
  const out = build + "/assets/css";

  return gulp
    .src(src + "/scss/main.scss")
    .pipe(
      sass({
        errorLogToConsole: devBuild,
        outputStyle: devBuild ? "expanded" : "compressed"
      })
    )
    .on("error", sass.logError)
    .pipe(concat("bundle.min.css"))
    .pipe(gulp.dest(out))
    .pipe(sync.stream());
}

// Javascript processing
function js() {
  const out = build + "/assets/js"; // output, izbuildani js

  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/parsleyjs/dist/parsley.js",
      "node_modules/parsleyjs/dist/i18n/hr.js",
      "node_modules/moment/min/moment.min.js",
      src + "/js/**/*" // gdje da traži js datoteke
    ])
    .pipe(newer(out)) // ima li razlika između source-a i build-a
    .pipe(deporder()) // pomoću ovoga ćemo manipulirati redoslijedom js fajlova (koji će biti prvi, npr. jQuery, pa onda neki drugi ...)
    .pipe(concat("bundle.min.js")) // spajat će sve u jednu datoteku
    .pipe(devBuild ? noop() : terser()) // sve će minimizirati
    .pipe(gulp.dest(out))
    .pipe(sync.stream());
}

/**
 * Watch for file changes
 * @param {*} done
 * @returns void
 */
function watch(done) {
  sync.init({
    server: {
      baseDir: "./" + build // tu mu kažemo da je root mapa: build
    }
  });

  // HTML changes
  gulp.watch(src + "/html/**/*", html); // 1: gdje da gleda za promjene u html-u, 2: koja funkcija će se izvršiti

  // CSS changes
  gulp.watch(src + "/scss/**/*", css); // gledaj u sve scss datoteke i okini css funkciju

  // JS changes
  gulp.watch(src + "/js/**/*", js); // 1: gdje da gleda za promjene u js-u, 2: koja funkcija će se izvršiti

  // Reload browser
  sync.reload();

  done();
}

// Create gulp single tasks
exports.html = html;
exports.css = css;
exports.js = js;
exports.watch = watch;

// Run all tasks
exports.build = gulp.parallel(exports.html, exports.css, exports.js);

// Default task
exports.default = gulp.series(exports.build, exports.watch); // sada je dovoljno reći: gulp (tj. npm run-script gulp)
