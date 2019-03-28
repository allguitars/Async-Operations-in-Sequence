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

// Wrap the for-loop with async function
async function getTitles() {
  for (const index of pageIndex) {
    // https://www.ptt.cc/bbs/Hong_Kong/index1401.html
    const uri = `${baseURL}/${boardName}/index${index}.html`;
    console.log(uri); // Print the page link

    const options = {
      uri,
      transform
    };

    // await the aync operation here
    await rp(options)
      .then($ => {
        const titles = $('.title a');
        console.log($(titles[0]).text()); // Print the title
      })
      .catch(err => console.log(err));
  }
}

getTitles();
