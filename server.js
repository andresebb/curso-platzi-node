const express = require("express");
const app = express();
const router = require("./network/routes");

app.use(express.json());
app.use(express.urlencoded({ extend: false }));

router(app);

app.use("/app", express.static("public"));

app.listen(3000);
console.log(
  `La aplicacion funciona en el puerto http://localhost:3000/message`
);
