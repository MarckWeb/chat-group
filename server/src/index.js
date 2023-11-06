import app from "./App.js"
import { PORT } from "./config.js";


app.listen(PORT, () => {
   console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
