const Model = require("./model");

function addMessage(message) {
  //Agregamos los datos a mongoose
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessage(filterByUser) {
  return new Promise((resolve, reject) => {
    let filterUser = {};
    if (filterByUser !== null) {
      //Le decimos a mongo que solo nos muestre informacion solo de ese user (si viene alguno)
      filterUser = { user: filterByUser };
    }

    //populate(campo dentro de la coleccion que quieres); Busca dentro de la DB, los objectId y populated, para eso le decimos cual es el campo
    //ese user no es el de ref: User, es el de arriba, el papa
    Model.find(filterUser)
      .populate("user")
      .exec((error, populated) => {
        if (error) {
          reject(error);
        }

        resolve(populated);
      });

    //Verificamos que el usuario exista.
    /* if (messages.length !== 0) {
      resolve(messages);
    } else {
      console.log("Usuario no se encuenta en la base de datos");
      return "Usuario no encontrado";
    } */
  });
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
