const twilio = require('twilio');
const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

const accountSid = 'ACaa5199ee6311b39782dd8f6ce3d16b8f';
const authToken = '709ab54b4dbe6419ff9ca64157b00490';
const sender = '+15623784480';
const recipient = '+12604024148';

const client = twilio(accountSid, authToken);

board.on('ready', () => {
  const [a5green, a6red] = new five.Leds(['a5', 'a6']);
  const door = new five.Switch({
    pin: 'a7',
    invert: true
  });

  door.on('close', () => {
    a6red.off();
    a5green.on();
  });

  door.on('open', () => {
    a5green.off();
    a6red.on();

    client.messages
      .create({
        body: `\n
        I NOTICED SOME ACTIVITY OVER THERE... 🙂 
        \n
        ${new Date().toLocaleString()}
        \n`,
        from: sender,
        to: recipient
      })
      .catch((err) => console.log(err));
  });
});
