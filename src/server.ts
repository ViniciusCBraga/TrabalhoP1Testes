import express, { Express } from 'express';


import carrinhoRoutes from './Routes/CarrinhoRoute';
import compraRoutes from './Routes/CompraRoute';
import eventoRoutes from './Routes/EventoRoute';
import ingressoRoutes from './Routes/IngressoRoute';
import usuarioRoutes from './Routes/UsuarioRoute';


const app: Express = express();
const cors = require('cors');

const port = 3034; // You can change this to the desired port number

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

app.use(carrinhoRoutes);
app.use(compraRoutes);
app.use(eventoRoutes);
app.use(ingressoRoutes);
app.use(usuarioRoutes);

var server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;