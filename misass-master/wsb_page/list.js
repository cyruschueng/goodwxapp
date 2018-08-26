const fs = require('fs')
const path = require('path')

function isDirectory (dir) {
    try {
        const stats = fs.statSync(dir)
        return stats.isDirectory()
    } catch (err) {
        return false
    }
}

function getFilenames (dir, regexp, recursive) {
    var  files = [];
    if (!isDirectory(dir)) throw new Error(dir + ' is not a directory!');
    fs.readdirSync(dir).forEach((filename) => {
        const fullPath = path.join(dir, filename);
        if (isDirectory(fullPath)) {
            if (recursive) files = files.concat(getFilenames(fullPath, regexp, recursive));
            else return
        }
        if (regexp && !regexp.test(filename)) return;
        files.push(fullPath)
    });
    return files
}
var html="<ul id='list'>";
getFilenames(__dirname+'/pages', /.html$/, true).forEach((file) => {
    var fileName = path.basename(file);
    var fileHref = file.split('wsb_page')[1];
    html +=`<li><a href="${fileHref}">${fileName}</a></li>`;
    console.info(fileHref);

});
html+="</ul>";
fs.writeFile('./list.txt',html,function(err){
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
});