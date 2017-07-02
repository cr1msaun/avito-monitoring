const apiKey = 'key-2618010b8361f2d9fae0c8c1fcd234ea';
const domain = 'sandboxf9c9acc64f26489e9c1b2d63d27032c1.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey, domain });

const mailTo = process.argv[3];

const send = (subject, searchUrl) => {
  const data = {
    subject,
    text: searchUrl,
    from: `Mailgun <postmaster@${domain}>`,
    to: mailTo,
  };

  mailgun.messages().send(data, (error) => {
    if (!error) console.log(error);

    console.log('Mail sent');
  });
};

module.exports.send = send;
