const express = require("express");

const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

router.post("/", function (req, res) {
  controller
    .addUser(req.body.user)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Informacion invalida",
        400,
        "Error en el controlador"
      );
    });
});

router.get("/", function (req, res) {
  const userName = req.query.name || null;
  controller
    .getUsers(userName)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

module.exports = router;
