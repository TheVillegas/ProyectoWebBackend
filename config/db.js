const mysql = require('mysql2');

const contecion = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : '',
 database : 'api_usuarios',
 port: 3306,
});
contecion.connect((error) => {
 if (error) {
   console.error('Error de conexión a la base de datos:', error);
 } else {
   console.log('Conexión exitosa a la base de datos');
 }
});


module.exports = contecion;

