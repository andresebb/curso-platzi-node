const store = require("./store");

function addChat(usuarios) {
  if (!usuarios || !Array.isArray(usuarios)) {
    return Promise.reject("Invalid user List");
  }

  const chat = {
    users: usuarios,
  };

  return store.add(chat);
}

function listChats(userId) {
  return store.list(userId);
}

module.exports = {
  addChat,
  listChats,
};
