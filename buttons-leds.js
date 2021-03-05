const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const buttons = new five.Buttons(['a5', 'a6']);
  const leds = new five.Leds(['b5', 'b6']);

  buttons.on('press', (button) => {
    const targetLed = leds[buttons.indexOf(button) === 1 ? 0 : 1];

    // if (targetLed.isOn) {
    //   targetLed.off();
    //   targetLed.isOn = false;
    // } else {
    //   targetLed.on();
    //   targetLed.isOn = true;
    // }

    if (leds.areBlinking) {
      leds.stop();
      leds.areBlinking = false;
    } else {
      leds.blink(66);
      leds.areBlinking = true;
    }
  });
});
