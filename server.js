const express = require("express");
const app = express();
const server = require("http").Server(app);

const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

db();

app.use(express.json());
app.use(express.urlencoded({ extend: false }));

socket.connect(server);

router(app);

app.use("/app", express.static("public"));

server.listen(3000, function () {
  console.log(
    `La aplicacion funciona en el puerto http://localhost:3000/message`
  );
});
