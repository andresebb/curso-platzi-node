# curso-platzi-node

## Métodos, cabeceras y estados

![Captura de pantalla](./.readme-static/metodos.png)
![Captura de pantalla](./.readme-static/cabeceras-estados.png)

## Cuerpo y query de la peticion

El cuerpo de la petición es la información en sí que queremos enviar, editar o que el servidor nos devuelva.

Las queries van a permitirte añadir información extra a los datos que queramos enviarle al servidor.

![Captura de pantalla](./.readme-static/query.png)

## Crear un servidor HTTP desde NodeJS

Primero que nada instalamos express, una libreria para crear servidores

```js
npm i express
```

Luego configuramos el server.js

```js
const express = require("express");

const app = express();

app.use("/", function (req, res) {
  res.send("Hola");
});

app.listen(3000);
console.log(`La aplicacion funciona en el puerto http://localhost:3000`);
```

Ahora ya podemos correr el server con

```js
  node server
```

## Como pueden venir las peticiones

![Captura de pantalla](./.readme-static/peticiones.png)

## Recibir información desde el cliente: Body y Query

```js
const express = require("express");
const router = express.Router();

const app = express();

//Aca le pasas el content typq que quieras json, urlencoded, xml
app.use(express.json()); //Nos permite trabajar con la respuesta del body (obligatorio)
app.use(express.urlencoded({ extend: false }));
app.use(router);

router.get("/message", function (req, res) {
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
```

Luego en insomia o lo que sea que uses le puedes pasar el content type y elquery

![Captura de pantalla](./.readme-static/insomia.png)

Luego en el terminal pueds ver la respuesta

![Captura de pantalla](./.readme-static/terminal.png)

## Información contextual: Leer las cabeceras

```js
router.get("/message", function (req, res) {
  console.log(req.headers);
  //Agregamos cabeceras personalizadas
  res.header({
    "custom-header": "Nuestro valor personalizado",
  });
  res.send("Lista de mensajes");
});
```

## Tipos de respuesta: Vacía, plana, con datos y estructurada

Formas de enviar una respuesta del servidor al cliente: vacia, plana, estructurada.

```js
router.post("/message", function (req, res) {
  console.log(req.body);
  console.log(res.query);
  // res.send(); respuesta vacia
  // res.status(201).send(`Mensaje anadido correctamente`); // respuesta plana
  res.status(201).send({ error: "", body: "Creado correctamente" }); //respuesta estructurada
});
```
