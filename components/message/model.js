const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creamos el schema con mongoose
const mySchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: "Chat",
  },
  //Le decimos que user va a recibir nuestro model de usuario,
  //El ref: User hace referencia a la collecion, asi se llama en el model de user
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },

  message: {
    type: String,
    required: true,
  },
  date: Date,
  file: String,
});

//Le pasamos, como se llama la coleccion en mongo ("Message") y el schema ("mySchema").
//Asi en la base de datos se guardara cumpliendo las reglas del schema
const model = mongoose.model("Message", mySchema);

module.exports = model;
