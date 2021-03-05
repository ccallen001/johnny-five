const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const spdt = new five.Switch('b5');
  const led = new five.Led('a5');

  spdt.on('close', () => {
    led.on();
  });
  spdt.on('open', () => {
    led.off();
  });
});
