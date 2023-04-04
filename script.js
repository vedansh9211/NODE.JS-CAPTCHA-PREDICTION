// 1. Fetch the image
// 2. Process the image
const request = require('request');
const Jimp = require('jimp');
const Tesseract = require('tesseract.js');

const url = 'https://i.ibb.co/jTKYQqP/Captcha-United.png';
request({url, encoding: null}, (err, response, buffer) => {
  if (err) throw err;

  Jimp.read(buffer, (err, image) => {
    if (err) throw err;
    image
      .greyscale()
      .contrast(1)
      .write('processed.jpg', () => {
        Tesseract.recognize('processed.jpg', 'eng', {tessjs_create_pdf: '0'}).then(({data: {text}}) => {
          console.log(text);
        });
      });
  });
});


// 1. npm install request jimp tesseract.js
// 2. node script.js