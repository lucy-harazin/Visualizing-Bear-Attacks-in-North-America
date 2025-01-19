//Comment out
//const express = require('C:/Users/QZhang/node_modules/express');
// const express = require('C:/Users/Qi Zhang/node_modules/express');
// Uncomment for your work
const express = require('C:/Users/Windows 10/node_modules/express');

const app = express();
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))