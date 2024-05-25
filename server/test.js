const fs = require('fs');
const path = require('path');
const removePerson = require('./remover');

(async () => {
  const photoPath = '../tests/test1/photo.png';
  const maskPath = '../tests/test1/mask.png';

  const photo = fs.readFileSync(photoPath);
  const mask = fs.readFileSync(maskPath);

  const result = await removePerson(photo, mask);

  if (result) {
    fs.writeFileSync(path.join(__dirname, 'output.jpg'), result);
    console.log('Person removed and image saved as output.jpg');
  } else {
    console.log('Failed to remove person from image');
  }
})();
