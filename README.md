# SwApi Integration - Indra

El siguiente proyecto realiza una integración entre [SWAPI](https://swapi.py4e.com/documentation#people) y DynamoDB, donde se traduce los keys a español y realizando un GET y POST request para la consulta o ingreso de datos respectivamente, teniendo un flujo como el siguiente:


![flow](flow.png)


## Pre-requisitos

- Configurar credenciales en AWS

    ```
    aws configure
    ```
## Instalación
- Clonar el repositorio
- Usar version de nodejs del proyecto (ver `.nvmrc`)
    ```
    nvm use
    ```
- Instalar dependencias
    ```
    npm install
    ```

## Ejecutando en local

- Para hacer prueba de la app en local
    ```
    npm run local
    ```

## Test al servicio SWAPI

- Para hacer prueba de la app en local
    ```
    npm run test
    ```

## Despliegue

- Para hacer el deploy
    ```
    npm run deploy
    ```

## Arquitectura con

- NodeJS
- Serverless Framework
- Typescript
- Dynamoose

## Documentación

- Puede encontrar la documentación en SWAGGER ejecutando:
    ```
    npm run docs
    ```

- Tambien disponible a traves del siguiente link: [Postman Documentation](https://documenter.getpostman.com/view/21763436/2s9YCBsoWY)

## Autor

* **James Noria** - *Full development* - [jamesnoria](https://github.com/jamesnoria)

## Licencia

- Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.

## Consideraciones for debugging

- Evitar ingresar los mismos datos en cada POST request.
- Recuerda usar node14 o superior.
