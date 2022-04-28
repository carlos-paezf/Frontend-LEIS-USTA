Creamos un componente para listar prestamos con acceso ah crear prestamo:

```txt
ng g c protected/modules/loan/pages/list-loans --skip-tests
```
Para este componente tambien se hicieron cambios en index.js (importacion de font-awesome)
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" referrerpolicy="no-referrer" />


style del componente

.titulo{
    font-size: 1.8rem;
}

.fas{
    cursor: pointer;
    margin-left: 7px;
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited,
.btn-primary:focus {
    background-color: #011b47;
    border-color: #011b47;
}