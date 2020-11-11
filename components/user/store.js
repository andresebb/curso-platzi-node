const { get } = require("mongoose");
const Model = require("./model");

const addUser = async (nameUser) => {
  const checkUser = await Model.exists({
    user: nameUser.user,
  });

  console.log(checkUser);

  if (checkUser !== true) {
    const newUser = new Model(nameUser);
    return newUser.save();
  } else {
    console.log("Esta usuerio ya existe en la Db");
    return "Esta usuario ya existe";
  }
};

const getList = async (userName) => {
  let filterByUser = {};

  //Filtrando si el usuario noAzmbre existe en la DB
  if (userName !== null) {
    filterByUser = { user: userName };
  }

  const checkIfUserExist = await Model.exists(filterByUser);

  if (checkIfUserExist === false) {
    return `Usuario ${userName} no encontrado`;
  } else {
    const users = await Model.find(filterByUser);
    return users;
  }
};

module.exports = {
  add: addUser,
  listUser: getList,
};
