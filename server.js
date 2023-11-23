const dotenv = require('dotenv').config({
  path: './config.env',
});
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
});

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => {
  // console.log(con);
  console.log('DB Connected Successfully');
});

app.listen(process.env.PORT, () => {
  console.log('Server Started and Listening....');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});
