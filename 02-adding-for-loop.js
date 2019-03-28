const rp = require('request-promise');
const cheerio = require('cheerio');

const baseURL = 'https://www.ptt.cc/bbs';
const boardName = 'Hong_Kong';
const pageIndex = [
  '', '1401', '1400', '1399', '1398', '1397', '1396', '1395', '1394', '1393'
];

function transform(body) {
  return cheerio.load(body);
}

// This still doesn't work as expected.
for (const index of pageIndex) {
  // https://www.ptt.cc/bbs/Hong_Kong/index1401.html
  const uri = `${baseURL}/${boardName}/index${index}.html`;
  console.log(uri); // Print the page link

  const options = {
    uri,
    transform
  };

  // Aync operation here
  rp(options)
    .then($ => {
      const titles = $('.title a');
      console.log($(titles[0]).text()); // Print the title
    })
    .catch(err => console.log(err));
}