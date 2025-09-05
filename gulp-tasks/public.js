"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("public", () => {
	return gulp.src(paths.public.src)
		.pipe(gulp.dest(paths.public.dist))
		.pipe(debug({
			"title": "Public"
		}));
});