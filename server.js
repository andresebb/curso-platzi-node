const express = require("express");
const router = express.Router();

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
  res.send("Lista de mensajes");
});

router.post("/message", function (req, res) {
  console.log(req.body); // nos trae el body
  console.log(req.query); // nos trae el query
  res.send("Mensaje anadido");
});

app.listen(3000);
console.log(
  `La aplicacion funciona en el puerto http://localhost:3000/message`
);
