class Pagination {
  constructor (items, currentPage, itemsPerPage) {
    this.className = this.constructor.name

    this.items = items
    this.currentPage = currentPage
    this.itemsPerPage = itemsPerPage
    var url = new URL(window.location);
    var c = url.searchParams.get("page");
    console.log(c)
  }

  on (eventName, callback) {
    this.$element.addEventListener(eventName, callback)
  }

  render () {
    this.$element = document.createElement('div')
    this.$element.classList.add(this.className)

    let pagesCount = this.items.length / this.itemsPerPage

    if (this.items.length > this.itemsPerPage) {

      for (let i = 0; i < pagesCount; i++) {
        let $page = document.createElement('a')
        $page.href = `?page=${i}`
        $page.classList.add('Pagination__page')

        if (this.currentPage === i) {
          $page.classList.add('is-selected')
        }

        $page.innerText = i + 1
        this.$element.appendChild($page)
      }
    }

    return this.$element
  }
}
