class Items {
  constructor (map) {
    this.map = map
    this.$currentItem = undefined
    this.currentPage = 0
    this.itemsPerPage = 25

    let URL = `output.json?${Math.random() * 1000}`
    let headers = { 'Content-Type': "application/json" }

    fetch(URL, { headers })
      .then(res => res.json())
      .then(this.onGetData.bind(this))

  }

  createItem (name, data) {
    let $el = document.createElement('div')

    if (data) {
      $el.innerHTML = data
    }

    $el.classList.add(`Item${name ? '__' + name : '' }`)

    return $el
  }

  renderItem (item) {
    let $service = this.createItem('service', item.service)
    let $footer = this.createItem('footer')

    let time = timeSince(new Date(item.date))
    let $metadata = this.createItem('metadata', `${time} en ${item.address}`)

    let content = `<p>${item.description}</p>`

    if (item.url) {
      content += `<img src="${item.url}" />`
    } 

    let $item = this.createItem(undefined, content)

    $item.appendChild($footer)
    $footer.appendChild($service)
    $footer.appendChild($metadata)

    this.$el.appendChild($item)

    $item.onclick = () => {
      if (this.$currentItem) {
       this.$currentItem.classList.remove('is-active')
      }

      $item.classList.add('is-active')
      this.map.visit(item.lat, item.long)
      this.$currentItem = $item
    }
  }

  onGetData (json) {
    this.$el = document.body.querySelector('.Items')
    this.items = json.data
    this.currentPage = +new URL(window.location).searchParams.get('page') || 0

    this.pagination = new Pagination(this.items, this.currentPage, this.itemsPerPage)

    let start = this.currentPage
    let end = this.currentPage + this.itemsPerPage

    this.items.slice(start, end).forEach(this.renderItem.bind(this))
    this.$el.appendChild(this.pagination.render())
  }
}

