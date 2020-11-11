const Model = require("./model");

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

async function removeMessage(id) {
  //Verficamos si le mensaje existe en DB
  const checkMessage = await Model.exists({
    _id: id,
  });

  if (checkMessage === true) {
    const deletedMessage = await Model.deleteOne({
      _id: id,
    });

    return `Mensaje ${id} eliminado correctamente`;
  } else {
    return `Mensaje ${id} no existe`;
  }
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: removeMessage,
};
