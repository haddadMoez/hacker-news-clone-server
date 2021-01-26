import mongoose from 'mongoose';
import { DB_HOST, DB_PORT, DB_NAME } from '../constants';

const connect = () => {
  return mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`🚀 Connected to ${DB_NAME}`))
    .catch((error) => console.log(`${error}`));
};

export default {
  connect,
};
