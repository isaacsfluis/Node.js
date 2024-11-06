import app from './app.js';  // Importa la configuración de la app
import dotenv from 'dotenv'; // Asegúrate de cargar las variables de entorno antes de iniciar el servidor

dotenv.config();  // Carga las variables de entorno

const port = process.env.PORT || 3000;  // Usa el puerto de las variables de entorno o el puerto 3000 por defecto

// Inicia el servidor
app.listen(port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Server is running on http://localhost:${port}`);
});
