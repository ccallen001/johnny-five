const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const sensor = new five.Sensor({
    pin: 'a7',
    threshold: 2
  });
  const led = new five.Led('b5');

  sensor.on('change', () => led.brightness(sensor.scaleTo(0, 255)));
});
