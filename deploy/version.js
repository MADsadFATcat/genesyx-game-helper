const fs = require('fs');

fs.readFile('package.json', 'utf8', (err, pack) => {
  if (!err) {
    let reg = /"version": "(.+?)",/;
    let version = pack.match(reg)[1];
    fs.readFile('public/manifest.json', 'utf8', (err, manifest) => {
      if (!err) {
        manifest = manifest.replace(reg, `"version": "${version}",`);
        fs.writeFile('ext/manifest.json', manifest, err => {
          if (!err) {
            console.log('new version write', version);
          } else {
            console.log(`error ${err}`);
          }
        });
        fs.writeFile('public/manifest.json', manifest, err => {
          if (!err) {
            console.log('new version write', version);
          } else {
            console.log(`error ${err}`);
          }
        });
      } else {
        console.log(`error ${err}`);
      }
    });
  } else {
    console.log(`error ${err}`);
  }
});