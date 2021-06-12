const timeSince  = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000)
 
  let interval = seconds / 31536000

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'year' : 'years'
    return `${amount} ${unit} ago`
  }

  interval = seconds / 2592000

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'month' : 'months'
    return `${amount} ${unit} ago`
  }

  interval = seconds / 86400

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'day' : 'days'
    return `${amount} ${unit} ago`
  }

  interval = seconds / 3600

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'hour' : 'hours'
    return `${amount} ${unit} ago`
  }

  interval = seconds / 60

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'minute' : 'minutes'
    return `${amount} ${unit} ago`
  }

  let amount = Math.floor(seconds)
  let unit = amount === 1 ? 'second' : 'seconds'

  return amount < 5 ? 'now' : `${amount} ${unit} ago`
}

const onLoad = () => {

  let URL = 'output.json'
  let headers = { 'Content-Type': "application/json" }

  fetch(URL, { headers })
    .then(res => res.json())
    .then((json) => {
      let $content = document.body.querySelector('.Items')

      json.data.forEach((item) => {

        let date = new Date(item.date)
        let $date = document.createElement('div')
        $date.innerHTML = timeSince(date)
        $date.classList.add('Item__date')

        let $service = document.createElement('div')
        $service.innerHTML = item.service
        $service.classList.add('Item__service')

        let $address = document.createElement('div')
        $address.innerHTML = item.address
        $address.classList.add('Item__address')

        let $footer = document.createElement('div')
        $footer.classList.add('Item__footer')

        let $item = document.createElement('div')

        $item.classList.add('Item')
        $item.innerHTML = `<p>${item.description}</p>`
        $item.appendChild($footer)
        $footer.appendChild($service)
        $footer.appendChild($date)
        $footer.appendChild($address)

        $content.appendChild($item)

      })
    })
}

window.onload = onLoad
