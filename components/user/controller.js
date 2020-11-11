const store = require("./store");

function addUser(name) {
  return new Promise(async (resolve, reject) => {
    if (!name) {
      console.error(`[messageController] Tienes que ingresar un usuario `);
      return reject("Los datos son incorrectos");
    }
    const user = {
      user: name,
      date: new Date(),
    };
    const data = await store.add(user);
    resolve(data);
  });
}

function getUsers(userName) {
  return new Promise(async (resolve, reject) => {
    resolve(store.listUser(userName));
  });
}

module.exports = {
  addUser,
  getUsers,
};
