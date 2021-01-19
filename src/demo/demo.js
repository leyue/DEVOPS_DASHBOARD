let d0 = '/*'

let lst = d0.split('/').filter((item) => {
  return item != ''
})

console.log(lst.length, lst)
