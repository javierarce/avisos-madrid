const fs = require('fs');
const util = require('util');
const readJSON = util.promisify(fs.readFile);
const writeJSON = util.promisify(fs.writeFile);

(async () => {
  const filename = process.argv[2] || 'input.json';

  const messages = JSON.parse(await readJSON(filename));
  const output = JSON.parse(await readJSON('output.json'));

  let data = [];

  const lastTime = new Date(output.time).getTime();

  messages.forEach((input) => {
    let id = input.token;
    let date = input.requested_datetime;
    let itemDate = new Date(date).getTime();

    if (itemDate > lastTime) {
      let long = input.long;
      let lat = input.lat;
      let address = input.address;
      let supporting = input.supporting;
      let complaining = input.complaining;
      let description = input.description;
      let typology = input.typology.typology_description;
      let service = input.service_name;
      let url = input.media_url;

      data.push({ id, date, long, lat, address, supporting, complaining, description, service, typology, url });
    }
  });

  data = data.concat(output.data);
  let time = data[0].date;
  await writeJSON('output.json', JSON.stringify({ time, data }, null, 2));
})();
