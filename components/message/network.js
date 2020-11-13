const express = require("express");
const path = require("path");
const multer = require("multer"); //Asi subimos archivos / imagenes a node
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");

//Le decimos a multer en que carpeta va aguardar esos archivos,
//la otra funcion se encarga de quitarlo de binarios y le guarda con el nombre original
var storage = multer.diskStorage({
  destination: "public/files/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", function (req, res) {
  const filterByUser = req.query.user || null;
  controller
    .getMessages(filterByUser)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.post("/", upload.single("file"), function (req, res) {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
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

router.patch("/:id", function (req, res) {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error interno", 500, e);
    });
});

router.delete("/:id", function (req, res) {
  controller
    .deleteMessage(req.params.id)
    .then((respuesta) => {
      response.success(req, res, respuesta, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error interno", 500, e);
    });
});
module.exports = router;
