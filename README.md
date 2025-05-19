Este es el servidor backend del proyecto de Ingeniería Web y Móvil. A continuación, se explica la estructura y función de las principales carpetas y archivos:

app.js
Archivo principal que levanta el servidor. Aquí se configura la conexión de las rutas de la API, por ejemplo, las rutas relacionadas con usuarios están en userRoutes.

routes/
Carpeta que contiene los archivos donde se definen las rutas de la API. Aquí se manejan las diferentes peticiones HTTP como GET, POST, DELETE y UPDATE, organizando las funcionalidades según el recurso (usuarios, productos, etc).

controllers/
Contiene la lógica principal del backend. Aquí se implementan las funciones que gestionan las operaciones de la API, como la validación y autenticación de usuarios, procesamiento de datos y reglas de negocio.

config/
Configuraciones del proyecto, principalmente la conexión a la base de datos.

models/
Define los esquemas y estructuras de los datos que se almacenan en la base de datos. Cada modelo representa una entidad o colección, como usuarios, productos, etc., y establece cómo se guardan y validan los datos.

