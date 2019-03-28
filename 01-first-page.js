const rp = require('request-promise');
const cheerio = require('cheerio');

const baseURL = 'https://www.ptt.cc/bbs';
const boardName = 'Hong_Kong';
// const pageIndex = [
//   '', '1401', '1400', '1399', '1398', '1397', '1396', '1395', '1394', '1393'
// ];

function transform(body) {
  return cheerio.load(body);
}

// https://www.ptt.cc/bbs/Hong_Kong/index.html
const uri = `${baseURL}/${boardName}/index.html`;
console.log(uri);
const options = {
  uri,
  transform
};

rp(options)
  .then($ => {
    const titles = $('.title a');
    console.log($(titles[0]).text());
  })
  .catch(err => console.log(err));
