const express = require("express");
const router = express.Router();
const response = require("./network/response");

const app = express();

//Aca le pasas el content typq que quieras json, urlencoded, xml
app.use(express.json()); //Nos permite trabajar con la respuesta del body (obligatorio)
app.use(express.urlencoded({ extend: false }));
app.use(router);

router.get("/message", function (req, res) {
  console.log(req.headers);
  //Agregamos cabeceras personalizadas
  res.header({
    "custom-header": "Nuestro valor personalizado 2",
  });
  response.success(req, res, "Lista de mensajes");
});

router.post("/message", function (req, res) {
  console.log(req.body);
  console.log(req.query);
  //Simulando error
  if (req.query.error == "ok") {
    response.error(req, res, "Hubo un error", 500);
  } else {
    response.success(req, res, "Mensaje creado correctamente", 201);
  }
});

app.listen(3000);
console.log(
  `La aplicacion funciona en el puerto http://localhost:3000/message`
);
