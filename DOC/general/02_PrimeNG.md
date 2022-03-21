# Prime NG

Vamos a usar los componentes que ofrece [Prime NG](https://www.primefaces.org/primeng/#/setup) para Angular.

## Instalación

Lo primero es instalar la librería de PrimeNG con el siguiente comando:

```txt
npm i primeng --save
```

Y también instalamos sus iconos con el siguiente comando:

```txt
npm i primeicons --save
```

## Configurar el tema a usar

Dentro del archivo `angular.json`, copiamos el tema a usar en la aplicación. Para ello buscamos la sección de `"styles"` que se encuentra dentro del objeto `"architect` y añadimos lo siguiente:

```json
{
    ...,
    "projects": {
        "frontend-leis": {
            ...,
            "architect": {
                "build": {
                    ...,
                    "options": {
                        "styles": {
                            "src/styles.css",
                            "node_modules/primeicons/primeicons.css",
                            "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
                            "node_modules/primeng/resources/primeng.min.css"
                        }
                    }
                }
            }
        }
    }
}
```

## Módulo especial para PrimeNG

Vamos a crear un módulo especial para importar los componentes que queremos de PrimeNg, de manera que centralizamos las importaciones de dicho paquete. Usamos el siguiente comando para tener un archivo llamado `src/app/prime-ng/prime-ng.module.ts`:

```txt
ng g m prime-ng
```

Luego, se importa el Módulo de PrimeNG en el decorador `NgModule` de los módulos en los que se necesita.

## Configurar estilos de la aplicación

Dentro del archivo `src/styles.css` necesitamos definir las variables que usaremos para el proyecto en general a partir de los estilos del paquete de PrimeNG.

```css
html, 
body {
    margin: 10px;
    background-color: var(--surface-a);
    font-family: var(--font-family);
}

.text-layout {
    color: var(--text-color)
}
```
