import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.15/mod.ts'

const filename = Deno.args[0] || 'input.json'

const messages = await readJSON(filename)
const output = await readJSON('output.json') 
const backup = await readJSON('data.json') 

let backupData = []
const data = []

const lastTime = new Date(output.time).getTime()

messages.forEach((input) => {
  const id = input.token
  const date = input.requested_datetime
  const itemDate = new Date(date).getTime()

  const long = input.long
  const lat = input.lat
  const address = input.address
  const supporting = input.supporting
  const complaining = input.complaining
  const description  = input.description
  const typology = input.typology.typology_description
  const service = input.service_name
  const url = input.media_url

  data.push({ id, date , long, lat, address, supporting, complaining, description, service, typology, url })

  if (itemDate > lastTime) {
    backupData.push({ id, date , long, lat, address, supporting, complaining, description, service, typology, url })
  }
})

backupData = backupData.concat(backup.data)
const time = data[0].date
await writeJSON('data.json', { time, data:backupData })
await writeJSON('output.json', { time, data })
