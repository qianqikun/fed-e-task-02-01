// TODO: site logics

$(($) => {
  const $body = $('html, body')
  debugger
  $('#scroll_top').on('click', () => {
    $body.animate({ scrollTop: 0 }, 600)
    return false
  })
})
