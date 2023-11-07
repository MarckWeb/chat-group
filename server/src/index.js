import app from "./App.js"
import { PORT } from "./config.js";


app.listen(PORT, () => {
   console.log(`Servidor en el puerto ${PORT}`);
});
