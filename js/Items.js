class Items {
  constructor (map) {
    this.map = map
    this.$currentItem = undefined
    this.currentPage = 1
    this.itemsPerPage = 25

    this.$spinner = document.body.querySelector('.js-spinner')

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

  renderItem (item, index) {
    let $item = this.createItem()

    $item.id = item.id

    if (index === 0) {
      this.$currentItem = $item
      $item.classList.add('is-active')
      this.map.visit(item.lat, item.long)
    }

    let content = item.description

    if (item.url) {
      content += `<img src="${item.url}" />`
    } 

    let $content = this.createItem('content', content)
    let $service = this.createItem('service', item.service)
    let $footer = this.createItem('footer')

    let time = timeSince(new Date(item.date))
    let $metadata = this.createItem('metadata', `${time} en ${item.address}`)

    $item.appendChild($service)
    $item.appendChild($content)
    $item.appendChild($footer)
    $footer.appendChild($metadata)

    this.$el.appendChild($item)

    if (this.id === item.id) {
      this.activateItem($item, item)
    }

    $item.onclick = this.activateItem.bind(this, $item, item)
  }

  activateItem ($item, item) {
    if (this.$currentItem) {
      this.$currentItem.classList.remove('is-active')
    }

    $item.classList.add('is-active')
    this.map.visit(item.lat, item.long)
    this.$currentItem = $item
    history.pushState({}, '', `/m/${item.id}`)
    setTimeout(() => $item.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  onGetData (json) {
    this.$spinner.classList.remove('is-visible')

    this.$el = document.body.querySelector('.Items')
    this.items = json.data
    this.currentPage = +new URL(window.location).searchParams.get('page') || 1
    this.id = new URL(window.location).searchParams.get('id')

    this.pagination = new Pagination(this.items.length, this.currentPage, this.itemsPerPage)

    let start = (this.currentPage - 1) * this.itemsPerPage
    let end = start + this.itemsPerPage

    this.$el.appendChild(this.pagination.renderArrows())
    this.items.slice(start, end).forEach(this.renderItem.bind(this))
    this.$el.appendChild(this.pagination.render())
  }
}
