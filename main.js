const timeSince  = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'año' : 'años'
    return `Hace ${amount} ${unit}`
  }

  interval = seconds / 2592000

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'mes' : 'meses'
    return `Hace ${amount} ${unit}`
  }

  interval = seconds / 86400

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'día' : 'días'
    return `Hace ${amount} ${unit}`
  }

  interval = seconds / 3600

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'hora' : 'horas'
    return `Hace ${amount} ${unit}`
  }

  interval = seconds / 60

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'minuto' : 'minutos'
    return `Hace ${amount} ${unit}`
  }

  let amount = Math.floor(seconds)
  let unit = amount === 1 ? 'segundo' : 'segundos'

  return amount < 5 ? 'ahora' : `Hace ${amount} ${unit}`
}

const onLoad = () => {

  let URL = `output.json?${Math.random() * 1000}`
  let headers = { 'Content-Type': "application/json" }

  fetch(URL, { headers })
    .then(res => res.json())
    .then(onGetData)

}
const createItem = (name, data) => {
  let $el = document.createElement('div')
  if (data) {
    $el.innerHTML = data
  }
  $el.classList.add(`Item${name ? '__' + name : '' }`)

  return $el
}

const onGetData = (json) => {
  let $content = document.body.querySelector('.Items')

  json.data.forEach((item) => {
    let $date = createItem('date', timeSince(new Date(item.date)))
    let $service = createItem('service', item.service)
    let $address = createItem('address', `en ${item.address}`)
    let $footer = createItem('footer')

    let content = `<p>${item.description}</p>`

    if (item.url) {
      content += `<img src="${item.url}" />`
    } 

    let $item = createItem(undefined, content)

    $item.appendChild($footer)
    $footer.appendChild($service)
    $footer.appendChild($date)
    $footer.appendChild($address)

    $content.appendChild($item)
  })
}

window.onload = onLoad
