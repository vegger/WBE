//
//  Example using EventEmitter
//
const EventEmitter = require('events')
const door = new EventEmitter()

door.on('open', (arg) => {
  console.log('Door was opened ' + arg)
})

process.nextTick(() => {
  console.log('next tick')
  door.emit('open', 'async')
})

door.emit('open', 'sync')

