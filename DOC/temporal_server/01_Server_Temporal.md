# Servidor Temporal

Vamos a crear un pequeño backend dentro de un archivo json, y luego instalamos un módulo que nos permite tener un sistema de CRUD de manera rápida a partir de dicho archivo. El paquete se llama ***JSON Server*** y lo instalamos con el siguiente comando:

```txt
npm i -g json-server
```

Luego, en la consola, nos dirigimos al archivo donde tenemos el JSON y ejecutamos el siguiente comando:

```txt
json-server --watch db.json
```

Si todo va bien, tendremos la siguiente salida:

```txt

  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/users
  http://localhost:3000/views

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
  
```

El contenido de nuestro archivo será el siguiente:

```json
{
    "users": [
        {
            "id": 1,
            "user": "Carlos David Páez",
            "email": "carlos.paezf@usantoto.edu.co",
            "password": "password"
        },
        ...
    ],
    "views": [
        {
            "id": 1,
            "name": "Dashboard",
            "path": "/dashboard"
        },
        ...
    ]
}
```
