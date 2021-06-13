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

    if (this.itemsLength > this.itemsPerPage) {
      this.renderRegularPagination()
    }

    return this.$element
  }

  renderSpecialPagination () {
    let pagesCount = this.itemsLength / this.itemsPerPage

    for (let i = 1; i <= 8; i++) {
      let $page = document.createElement('a')

      if (i === 0) {
        $page.href = window.location.origin + window.location.pathname
      } else {
        $page.href = `?page=${i}`
      }

      $page.classList.add('Pagination__page')

      if (this.currentPage === i) {
        $page.classList.add('is-selected')
      }

      $page.innerText = i 
      this.$element.appendChild($page)
    }
  }

  renderPrevPagination () {
    let $prev

    if (this.currentPage > 1) {
      $prev = document.createElement('a')

      if (this.currentPage === 2) {
        $prev.href = window.location.origin + window.location.pathname
      } else {
        $prev.href = `?page=${this.currentPage - 1}`
      }
    } else {
      $prev = document.createElement('span')
    }

    $prev.innerText = 'Anterior'
    $prev.classList.add('Pagination__page')
    this.$element.appendChild($prev)
  }

  renderNextPagination () {
    let pagesCount = this.itemsLength / this.itemsPerPage

    let $next

    if (this.currentPage < pagesCount) {
      $next = document.createElement('a')
      $next.href = `?page=${this.currentPage+ 1}`
    } else {
      $next = document.createElement('span')
    }

    $next.classList.add('Pagination__page')
    $next.innerText = 'Siguiente'
    this.$element.appendChild($next)
  }

  renderRegularPagination () {
    this.renderPrevPagination()
    this.renderNextPagination()
  }
}
