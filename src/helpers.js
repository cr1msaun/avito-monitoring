const fs = require('fs');
const equal = require('deep-equal');
const moment = require('moment');
const mailer = require('./mailer');
const endOfLine = require('os').EOL;

const getCurrentIds = filename =>
  new Promise((resolve, reject) => {
    let content = '';

    fs.open(filename, 'a+', (err) => {
      if (err) reject(err);

      const stream = fs.createReadStream(filename);

      stream.on('data', (data) => {
        content += data;
      });

      stream.on('end', () => {
        resolve(content.toString('utf8').replace(/\r\n/g, '\n').split('\n'));
      });
    });
  });

const writeNewIds = (newIds, filename) => {
  const content = newIds.join(endOfLine);
  fs.writeFileSync(filename, content, 'utf8');
};

const checkForUpdates = (oldIds, newIds, filename, searchUrl) => {
  let message = `${moment().format('Y-MM-DD HH:mm:ss')}\n`;
  let changed = false;

  if (!equal(oldIds.slice(0, 10), newIds.slice(0, 10))) {
    changed = true;
  }

  if (changed) {
    writeNewIds(newIds, filename);
    message += 'There was an update!\n';
    mailer.send('Avito update!', searchUrl);
  }

  message += 'Checking ended.\n';
  console.log(message);
};

module.exports = {
  getCurrentIds,
  checkForUpdates,
};
