const mongoose = require('mongoose');
const logger = require('pino')()
const { DB_HOST, DB_PORT, DB_NAME } = require('../constants');
const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info(`Connected to ${DB_NAME}`))
  .catch((error) => logger.error(error));
