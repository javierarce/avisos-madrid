import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.10/mod.ts'

const filename = Deno.args[0] 

const messages = await readJSON(filename)
const output = await readJSON('output.json')

let data = []
const lastID = output.lastID

messages.forEach((input) => {
  let id = input.token

  if (lastID === id) {
    console.log(`Stopped at ${id}`)
    return
  }

  let date = input.requested_datetime
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
})

data = data.concat(output.data)

console.log('Writting')
console.log(data)

await writeJSON('output.json', {
  lastID: data[data.length - 1].id,
  time: new Date(),
  data
})
