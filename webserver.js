const Tessel = require('tessel-io');
const five = require('johnny-five');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/rainbow', (req, res) => {
  const board = new five.Board({
    io: new Tessel()
  });

  board.on('ready', () => {
    // red, orange, yellow, green, blue
    const leds = new five.Leds(['a2', 'a3', 'a4', 'a5', 'a6']);

    let count = 0;
    let index = 0;
    let step = 1;

    board.loop(66, (cancelLoop) => {
      leds.off();

      if (++count < 50) {
        if (++index % 2 === 0) {
          leds[0].on();
          leds[2].on();
          leds[4].on();
        } else {
          leds[1].on();
          leds[3].on();
        }
      } else {
        if (count === 50) {
          index = 0;
        }

        leds[index].on();

        index += step;

        if (index === 0 || index === leds.length - 1) {
          step *= -1;
        }

        if (count === 100) {
          cancelLoop();

          leds.on();

          setTimeout(() => {
            leds.off();
          }, 500);
        }
      }
    });
  });

  res.sendStatus(200);
});

app.listen(1234, () => 'webserver running on 1234...');
