Express MVC
=========

##### v0.1.0 (Mie 03 Jun 2015 18:28 GMT-06)

Este proyecto presenta una propuesta para la estructura de una aplicación web con ExpressJS implementando el Patrón de
Diseño MVC, basado en el artículo [Best Practices for Express app structure](http://www.terlici.com/2014/08/25/best-practices-express-structure.html)
y adaptado a la plantilla generada por la herramienta: ``express-generator```.

Proyecto Base
---------

    bin/
        www 
    helpers/
    middlewares/
    models/
    public/
        assets/
        fonts/
        images/
        javascripts/
        stylesheets/        
    routes/
        index.js
    views/
    tests/
    .gitignore
    app.js
    db.js
    package.json   

La propuesta asume como controlador la carpeta ```routes```, en donde se han de definir las rutas o controladores o 
actions. A continuación se detallan todos los directorios y archivos principales.
 
- **bin/:** Contiene script de arranque ```www``` el cual inicializa la base de datos y el servidor de
    websockets. Invocado vía ```npm start```
- **helpers/:** Código y funcionalidades que son compartidas por diferentes componentes de la aplicación.
- **middlewares/:** Funciones que procesan las peticiones recibidas antes de ser delegadas al proceso de ruteo.
- **models/:** Modelos de la lógica de negocio que proveen una interfaz de comunicación con la Base de Datos al 
    Controlador.
- **public/:** Contiene todos los recursos que son accesibles desde el navegador de nuestra aplicación: hojas de estilo,
    código javascript client-side, imágenes, fuentes personalizadas y recursos propios de la aplicación (assets).
- **routes/:** Corresponde a la capa del controlador del modelo MVC. Aquí se define un controlador por cada archivo JS
    el cual a su vez define las rutas que habrán de procesar las peticiones. El archivo ```index.js``` contiene
    referencias a los demás controladores para ser inyectadas a Express.
- **views/:** Corresponde a la capa de vista del modelo MVC. Agrupa todos los archivos que utiliza el motor de templates
    utilizado. Es conveniente organizar las vistas por componentes dentro de esta carpeta, a fin de poder tener 
    múltiples layouts que se ajusten a diferentes componentes de la vista.
- **test/:** Directorio que contiene código para realizar pruebas unitarias, regularmente vía mocha.
- ```app.js```: Archivo principal de la aplicación que instancía todos los módulos y establece su configuración inicial.
- ```db.js```: Archivo que contiene funciones para conexión con la Base de Datos, cerrar conexión o devolver la conexión
    actual. Es utilizado por app.js
- ```package.json```: Es utilizado para declarar las dependencias del proyecto, nombre de éste, autor y versión, entre
    otros datos importantes.

-------------------------------------------------------------

##### Docs

- [MongoDocs: MongoClient()] (https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)
- [MongoDocs: Db()] (https://mongodb.github.io/node-mongodb-native/api-generated/db.html)
- [MongoDocs: .insert()] (http://docs.mongodb.org/manual/tutorial/insert-documents/)
- [Stackoverflow: Better approach using MongoDB native driver in NodeJS] (http://stackoverflow.com/questions/24583650/better-approach-using-mongodb-native-driver-in-nodejs?rq=1)
- [HectorCorrea.com: Personal site with MVC] (https://github.com/hectorcorrea/hectorcorrea.com)
- [strongloop: ExpressJS MVC example] (https://github.com/strongloop/express/tree/master/examples/mvc)

-------------------------------------------------------------

[Daniel HConstantino](mailto:danielhconstantino@gmail.com)

@dhconstantino
