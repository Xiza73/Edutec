import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

const dbOptions: ConnectOptions = {
  bufferCommands: true,
  autoIndex: true,
  autoCreate: true,
};

mongoose.connect(config.mongodb, dbOptions).then(
<<<<<<< HEAD
// mongoose.connect('mongodb://localhost:27017/edutec', dbOptions).then(
=======
//mongoose.connect('mongodb://localhost:27017/edutec', dbOptions).then(
>>>>>>> 6e103242b79ceffcd7e38adec1fe18e93880043d
  () => {
    console.log("Conectado a la base de datos");
  },
  (err) => {
    console.log("Error al conectar con la base de datos");
  }
);

module.exports = mongoose;
