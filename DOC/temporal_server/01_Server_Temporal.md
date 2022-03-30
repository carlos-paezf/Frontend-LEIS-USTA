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
  http://localhost:3000/messages

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
    "messages": [
        {
            "id": "1",
            "title": "Expiración de mantenimiento",
            "category": "equipment",
            "msg": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit illo eum cum tempore eos. Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Impedit illo eum cum tempore eos. Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Impedit illo eum cum tempore eos. Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,Impedit illo eum cum tempore eos. Quod consequatur consequuntur quaerat placeat error odit temporibus at ullam autem vel,deleniti inventore accusamus corporis.",
            "date": "Thu Mar 24 2022 01:37:44 GMT-0500",
            "check": true
        },
        ...
    ]
}
```
