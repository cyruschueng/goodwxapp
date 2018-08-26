// 引入模块
const https = require('https');
const cheerio = require('cheerio');

// 爬取目标网站URL
let url = 'https://microzz.com';

// 使用get方法访问
https.get(url, res => {
  let html = '';

  // 监听data事件获取html源码
  res.on('data', data => {
    html += data;
  });

 // 监听end事件，同时把获取到的数据传给filterData方法进行过滤
  res.on('end', () => {
    let titles = filterData(html);
    console.log(titles);
  });

}).on('error', e => {
  console.log(e.message);
});

// 使用cheerio模块对内容进行筛选过滤
function filterData(html) {
  let $ = cheerio.load(html);
  let oTitles = $('.post-title-link');
  let titles = '';

  oTitles.each( (index, item) => {
    let title = $(item).text();
    let end = index == (oTitles.length - 1) ? '' : '\n';
    titles += '【' + (index+1) + '】' + title + end;
  });

  return titles;

}