const isEmail = require('isemail');

const args = process.argv;

const checkArguments = () => {
  if (args.length < 4) {
    console.log("Usage: node src/index.js '<url>' <recipient>");
    process.exit();
  }

  if (!isEmail.validate(args[3])) {
    console.log('Enter the right email address.');
    process.exit();
  }
};

module.exports = checkArguments;
