const webStore = require('./webStore');

webStore.publish('trustedTesters').then(res2 => {
  console.log('Successfully published the newer version', res2);
}).catch((error) => {
  console.log(`Error while publishing uploaded extension: ${error}`);
  process.exit(1);
});
