# Animate.css

Vamos a instalar una librería para animaciones CSS, con la intención de que la aplicación no sea muy tosca visualmente. Para instalar [Animate.css](https://animate.style/) usamos el siguiente comando:

```txt
npm install animate.css --save
```

Luego dentro del archivo `src/index.html`, importamos el CDN de la librería:

```html
<head>
    ...

    <!-- Animate.css  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</head>
```

En los componentes HTML donde queremos una animación, debemos usar la siguiente estructura de la clase:

```html
<h1 class="animate__animated animate__bounce">Elemento a animar</h1>
```

Por ejemplo, para el las vistas de los formularios de autenticación, usare la animación llamada FadeIn:

```html
<div class="form__content animate__animated animate__fadeIn">...</div>
```
