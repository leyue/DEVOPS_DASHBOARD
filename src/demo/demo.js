let moment = require('moment')

let time = moment().format('YYYY MMMM Do, h:mm:ss a')
console.log(time)

let mo = moment.duration(8.128215, 'seconds')

console.log(`${mo.minutes()}-${mo.seconds()}`)
