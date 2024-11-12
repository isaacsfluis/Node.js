import app from './app.js';  // Importa la configuración de la app
import dotenv from 'dotenv'; // Carga las variables de entorno


dotenv.config();  // Carga las variables de entorno


const port = process.env.PORT || 3000;  // Usa el puerto de las variables de entorno o el puerto 3000 por defecto

// Inicia el servidor y guarda la referencia
const server = app.listen(port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Server is running on http://localhost:${port}`);
});

// Exporta el servidor para cerrarlo en las pruebas
export default server;
