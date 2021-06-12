class Pagination {
  constructor (itemsLength, currentPage, itemsPerPage) {
    this.className = this.constructor.name

    this.itemsLength = itemsLength
    this.currentPage = currentPage
    this.itemsPerPage = itemsPerPage
  }

  on (eventName, callback) {
    this.$element.addEventListener(eventName, callback)
  }

  render () {
    this.$element = document.createElement('div')
    this.$element.classList.add(this.className)

    let pagesCount = this.itemsLength / this.itemsPerPage

    if (this.itemsLength > this.itemsPerPage) {

      for (let i = 0; i < pagesCount; i++) {
        let $page = document.createElement('a')

        if (i === 0) {
          $page.href = `/`
        } else {
          $page.href = `?page=${i}`
        }

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
