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
