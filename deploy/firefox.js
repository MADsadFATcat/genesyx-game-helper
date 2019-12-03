const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const webExt = require('web-ext').default;

const sourceDir = process.argv[2];
const artifactsDir = process.argv[3];
const apiKey = process.argv[4];
const apiSecret = process.argv[5];
const extId = process.argv[6];
const extVersion = process.argv[7];

webExt.cmd.build({
  sourceDir: sourceDir,
  artifactsDir: artifactsDir
}).then(buildResult => {
  const extensionPath = buildResult.extensionPath;
  const authToken = jwt.sign({iss: apiKey}, apiSecret, {
    algorithm: 'HS256',
    expiresIn: 60 * 5, // 5 min
  });

  const zip = fs.createReadStream(extensionPath);
  let formData = new FormData();
  formData.append('upload', zip);
  const headers = formData.getHeaders();
  headers['Authorization'] = `JWT ${authToken}`;

  axios.put(`https://addons.mozilla.org/api/v4/addons/${extId}/versions/${extVersion}/`,
    formData,
    {
      headers: headers
    })
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res);
    });
});