const path = require("path");
const through = require("through2");
const File = require("vinyl");
const pug = require("pug");

module.exports = function(options) {
    const icons = [];

    function bufferStream(file, enc, cb) {
        const oFile = path.parse(file.path);

        if (oFile.ext === ".svg")
        {
            icons.push(oFile.name);
        }
        cb(null, file);
    }

    function endStream(cb) {
        const htmlFile = new File({
          cwd: "/",
          base: "/",
          path: "/index.html"
        });
        const compile = pug.compileFile(path.join(__dirname, "./index.jade"));
        htmlFile.contents = new Buffer(compile({ icons, fontAlias: options.fontAlias, fontName: options.fontName }));
        this.push(htmlFile);
        cb();
    }
    return through.obj(bufferStream, endStream);
};
