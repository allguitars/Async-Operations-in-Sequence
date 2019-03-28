const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');

const baseURL = 'https://www.ptt.cc/bbs';
const boardName = 'Hong_Kong';
const pageIndex = [
  '', '1401', '1400', '1399', '1398', '1397', '1396', '1395', '1394', '1393'
];
let $ = null;

function transform(body) {
  return cheerio.load(body);
}

// --- async/await ---
async function getFirstTitle(index) {
  try {
    const uri = `${baseURL}/${boardName}/index${index}.html`;  // https://www.ptt.cc/bbs/Hong_Kong/index1399.html
    console.log(uri);
    const options = {
      uri,
      transform
    };
    $ = await rp(options);
    const titles = $('.title a');
    console.log($(titles[0]).text());

  } catch (ex) {
    console.log(ex);
  }
}

async function getTitles() {
  for (const index of pageIndex) {
    await getFirstTitle(index);
  }
}

getTitles();

// --- Promise ---
// for (const index of pageIndex) {
//   const uri = `${baseURL}/${boardName}/index${index}.html`;  // https://www.ptt.cc/bbs/Hong_Kong/index1399.html
//   console.log(uri);
//   const options = {
//     uri,
//     transform
//   };

//   rp(options)
//     .then($ => {
//       const titles = $('.title a');
//       console.log($(titles[0]).text());
//     })
//     .catch(err => console.log(err));
// }



