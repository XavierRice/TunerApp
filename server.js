//Dependencies
const app = require('./app.js');

//Config
require('dotenv').config()
const PORT = process.env.PORT;

//LISTENING
app.listen(PORT, () => {
    console.log(`Loud n' Clear sis!💅🏾${PORT}`)
});


