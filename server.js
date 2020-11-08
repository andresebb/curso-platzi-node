const express = require("express");

const app = express();

app.use("/", function (req, res) {
  res.send("Hola");
});

app.listen(3000);
console.log(`La aplicacion funciona en el puerto http://localhost:3000`);
