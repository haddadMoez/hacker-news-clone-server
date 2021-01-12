const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME } = require('../constants');
const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${DB_NAME}`))
  .catch((error) => console.log(error));
