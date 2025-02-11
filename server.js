const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app.js');

dotenv.config();

const {DB_HOST, PORT} = process.env;  

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful. Use our API on port: ${PORT}`)
  })
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
});

