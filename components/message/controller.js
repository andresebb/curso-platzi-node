const socket = require("../../socket").socket;
const store = require("./store");

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error(`[messageController] No hay usuario o mensaje`);
      return reject("Los datos son incorrectos");
    }

    console.log(file);

    let fileUrl = "";
    if (file) {
      fileUrl = `http://localhost:3000/app/files/${file.filename}`;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
    store.add(fullMessage);

    //Websocket asi mandamos el mensaje
    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterByUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterByUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      console.error("no pasaste id o mensaje");
      return reject("Los datos no son correctos");
    }

    const result = await store.updateText(id, message);
    resolve(result);
  });
}
function deleteMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      console.error("no pasaste id o mensaje");
      reject("Id invalido");
    }

    const result = await store.remove(id);
    resolve(result);
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
