const zipFolder = require('zip-folder');
const fs = require('fs');
const webStore = require('./webStore');

let folderName = 'ext';
let zipName = 'deploy/deploy.zip';

zipFolder(folderName, zipName, function (err) {
  if (err) {
    console.log('oh no! ', err);
  } else {
    console.log(`Successfully zipped the ${folderName} directory and store as ${zipName}`);
    const source = fs.createReadStream(zipName);
    webStore.uploadExisting(source).then(res => {
      console.log('Successfully uploaded the ZIP', res);
    }).catch((error) => {
      console.log(`Error while uploading ZIP: ${error}`);
      process.exit(1);
    });   
  }
});
