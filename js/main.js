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
    let unit = amount === 1 ? 'h' : 'h'
    return `Hace ${amount}${unit}`
  }

  interval = seconds / 60

  if (interval > 1) {
    let amount = Math.floor(interval)
    let unit = amount === 1 ? 'm' : 'm'
    return `Hace ${amount}${unit}`
  }

  let amount = Math.floor(seconds)
  let unit = amount === 1 ? 'segundo' : 'segundos'

  return amount < 5 ? 'ahora' : `Hace ${amount} ${unit}`
}

const onLoad = () => {
  map = new Map(lat, long)

  if (!lat || !long) {
    items = new Items(map)
  }
}

window.onload = onLoad
