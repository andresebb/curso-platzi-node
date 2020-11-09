const express = require("express");

const router = express.Router();
const response = require("../../network/response");

router.get("/", function (req, res) {
  console.log(req.headers);
  //Agregamos cabeceras personalizadas
  res.header({
    "custom-header": "Nuestro valor personalizado 2",
  });
  response.success(req, res, "Lista de mensajes");
});

router.post("/", function (req, res) {
  console.log(req.body);
  console.log(req.query);
  //Simulando error
  if (req.query.error == "ok") {
    response.error(
      req,
      res,
      "Error inesperado",
      500,
      "Es solo una simulacion de los errrores"
    );
  } else {
    response.success(req, res, "Mensaje creado correctamente", 201);
  }
});

module.exports = router;
