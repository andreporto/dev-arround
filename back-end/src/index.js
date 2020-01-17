require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();

const server = http.Server(app);

setupWebsocket(server);

app.use(cors());

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Métodos HTTP: GET, POST, DELETE, PUT

// Tipos de parâmetros:

// Query Params: req.query
// Route Params: req.params
// Body        : req.body

app.use(express.json());
app.use(routes);

server.listen(3333);