class Pagination {
  constructor (itemsLength, currentPage, itemsPerPage) {
    this.className = this.constructor.name

    this.itemsLength = itemsLength
    this.currentPage = currentPage 
    this.itemsPerPage = itemsPerPage
  }

  on (eventName, callback) {
    this.$pagination.addEventListener(eventName, callback)
  }

  render () {
    this.$pagination = document.createElement('div')
    this.$pagination.classList.add(this.className)

    if (this.itemsLength > this.itemsPerPage) {
      this.renderPrevPagination()
      this.renderNextPagination()
    }

    return this.$pagination
  }

  renderArrows () {
    this.$arrowPagination = document.createElement('div')
    this.$arrowPagination.classList.add(this.className + '__arrows')

    if (this.itemsLength > this.itemsPerPage) {
      const $prev = this.renderPrevArrowPagination()
      const $next = this.renderNextArrowPagination()

      this.$arrowPagination.appendChild($prev)
      this.$arrowPagination.appendChild($next)
    }

    return this.$arrowPagination
  }

  renderPrevArrowPagination () {
    let $prev

    if (this.currentPage > 1) {
      $prev = document.createElement('a')

      if (this.currentPage === 2) {
        $prev.href = window.location.origin + window.location.pathname
      } else {
        $prev.href = `/?page=${this.currentPage - 1}`
      }
    } else {
      $prev = document.createElement('span')
    }

    $prev.innerText = '←'
    $prev.classList.add('Pagination__page')

    return $prev
  }

  renderNextArrowPagination () {
    const pagesCount = this.itemsLength / this.itemsPerPage

    let $next

    if (this.currentPage < pagesCount) {
      $next = document.createElement('a')
      $next.href = `/?page=${this.currentPage+ 1}`
    } else {
      $next = document.createElement('span')
    }

    $next.classList.add('Pagination__page')
    $next.innerText = '→'

    return $next
  }

  renderPrevPagination () {
    let $prev

    if (this.currentPage > 1) {
      $prev = document.createElement('a')

      if (this.currentPage === 2) {
        $prev.href = window.location.origin + window.location.pathname
      } else {
        $prev.href = `/?page=${this.currentPage - 1}`
      }
    } else {
      $prev = document.createElement('span')
    }

    $prev.innerText = 'Anterior'
    $prev.classList.add('Pagination__page')
    this.$pagination.appendChild($prev)
  }

  renderNextPagination () {
    const pagesCount = this.itemsLength / this.itemsPerPage

    let $next

    if (this.currentPage < pagesCount) {
      $next = document.createElement('a')
      $next.href = `/?page=${this.currentPage+ 1}`
    } else {
      $next = document.createElement('span')
    }

    $next.classList.add('Pagination__page')
    $next.innerText = 'Siguiente'
    this.$pagination.appendChild($next)
  }
}
