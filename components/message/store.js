//Conection  mongoDb con mongoose
"use stric";
const db = require("mongoose");
const Model = require("./model");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

//Se le dice a mongoose que por defecto use las promesas nativas
db.Promise = global.Promise;

db.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("[DB] conectada con exito");
  })
  .catch((error) => {
    console.error("No se puede conectar a la DB", error);
    process.exit(1);
  });

function addMessage(message) {
  //Agregamos los datos a mongoose
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage(filterByUser) {
  let filterUser = {};
  if (filterByUser !== null) {
    //Le decimos a mongo que solo nos muestre informacion solo de ese user (si viene alguno)
    filterUser = { user: filterByUser };
  }
  const messages = await Model.find(filterUser);
  //Verificamos que el usuario exista.
  if (messages.length !== 0) {
    return messages;
  } else {
    console.log("Usuario no se encuenta en la base de datos");
    return "Usuario no encontrado";
  }
}

async function updateText(id, mensaje) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = mensaje;
  const newMessage = await foundMessage.save();
  return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
};
