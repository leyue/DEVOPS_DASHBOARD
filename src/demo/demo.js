let moment = require('moment')

let time = moment().format('YYYY MMMM Do, h:mm:ss a')
console.log(time)

let arry = [{ age: 1 }, { age: 2 }]

let item = arry.find((val, idx, arry) => {
  return val.age == 3
})
console.log(!item)
item.age = 10

console.log(arry)
