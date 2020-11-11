//Conection  mongoDb con mongoose
"use stric";
const db = require("mongoose");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

//Se le dice a mongoose que por defecto use las promesas nativas
db.Promise = global.Promise;

const connectDB = async () => {
  try {
    await db.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[DB] conectada con exito");
  } catch (e) {
    console.error("No se puede conectar a la DB", e);
    process.exit(1);
  }
};

module.exports = connectDB;
