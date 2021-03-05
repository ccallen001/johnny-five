const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const btn = new five.Button('a2');
  const led = new five.Led('a5');

  btn.on('press', () => led.on());
  btn.on('hold', () => led.blink(100));
  btn.on('release', () => led.stop().off());
});
