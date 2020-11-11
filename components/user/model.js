const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creamos el schema con mongoose
const mySchema = new Schema({
  user: String,
  date: Date,
});

//Le pasamos, como se llama la coleccion en mongo ("Message") y el schema ("mySchema").
//Asi en la base de datos se guardara cumpliendo las reglas del schema
const model = mongoose.model("user", mySchema);

module.exports = model;
