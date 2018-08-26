# gulp-font-icon

`gulp-font-icon` is a gulp plugin to generate icon fonts from SVG files.

## Usage

First, install gulp-font-icon as a development dependency:

	npm install --save-dev gulp-font-icon

Then, add it to your gulpfile.js:

	var fontIcon = require("gulp-font-icon");

	gulp.task("fontIcon", function() {
		return gulp.src(["src/res/icons/*.svg"])
			.pipe(fontIcon({
				fontName: "myfont",
				fontAlias: "mf"
			}))
			.pipe(gulp.dest("assets/res/icons/"));
	});

Then, it will generate `myfont.ttf`, `myfont.eot`, `myfont.woff`, `myyfont.woff2`, `myfont.svg` and `myfont.css`.

If you want to generate `index.html` for a demo, you have to do like this:

	var fontIcon = require("gulp-font-icon");
	var htmlGen = fontIcon.htmlGen;

	gulp.task("fontIcon", function() {
		const options = {
			fontName: "myfont",
			fontAlias: "mf"
		};
		return gulp.src(["src/res/icons/*.svg"])
			.pipe(htmlGen(options))
			.pipe(fontIcon(options))
			.pipe(gulp.dest("assets/res/icons/"));
	});

## API

### options.fontName

Type: `String` Default value: "fontIcon"

### options.fontAlias

Type： `String` Default value: "fi"
