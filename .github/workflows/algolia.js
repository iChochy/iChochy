const algoliasearch = require('algoliasearch');
const fs = require('fs');

const APPLICATION_ID = process.env.secrets.APPLICATION_ID;
const ADMIN_API_KEY = process.env.secrets.ADMIN_API_KEY;
const INDEX_NAME = process.env.secrets.INDEX_NAME;
const FILE_PATH = process.env.secrets.FILE_PATH;

const client = algoliasearch(APPLICATION_ID, ADMIN_API_KEY)
const index = client.initIndex(INDEX_NAME)

try {
  const data = fs.readFileSync(FILE_PATH, 'utf8')
  const objects = JSON.parse(data);
  index
    .saveObjects(objects, { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
      console.log(objectIDs);
      console.log("Save Objects End");
    });
} catch (err) {
  console.error(err)
}
