import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.10/mod.ts'

const filename = Deno.args[0] || 'input.json'

const messages = await readJSON(filename)
const output = await readJSON('output.json') 

let data = []

const lastTime = new Date(output.time).getTime()

messages.forEach((input) => {
  let id = input.token
  let date = input.requested_datetime
  let itemDate = new Date(date).getTime()

  if (itemDate > lastTime) {
    let long = input.long
    let lat = input.lat
    let address = input.address
    let supporting = input.supporting
    let complaining = input.complaining
    let description  = input.description
    let typology = input.typology.typology_description
    let service = input.service_name
    let url = input.media_url

    data.push({ id, date , long, lat, address, supporting, complaining, description, service, typology, url })
  }
})

data = data.concat(output.data)
let time = data[0].date
await writeJSON('output.json', { time, data })
