require('./argv')();

const shorthash = require('shorthash');
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');
const helpers = require('./helpers');

const urlToParse = process.argv[2];

const filename = path.join(__dirname, '/searches/', shorthash.unique(urlToParse));

const options = {
  uri: urlToParse,
  transform: body => cheerio.load(body),
};

const init = (filename) => {
  rp(options)
    .then(($) => {
      const newIds = [];

      $('.catalog-list').find('.item').each((idx, elem) => {
        const ad = $(elem);
        const id = ad.attr('id').substr(1);

        // const link = ad.find('.item-description-title-link');
        // const url = link.attr('href');
        // const name = link.text();

        newIds.push(id);
      });

      helpers
        .getCurrentIds(filename)
        .then((currentIds) => {
          helpers.checkForUpdates(currentIds, newIds, filename, urlToParse);
        });
    })
    .catch(err => console.log('Crawling failed: ', err));
};

setInterval(() => {
  init(filename);
}, 5 * 60 * 1000);
