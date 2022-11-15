const express = require('express');
const app = express();
const pug = require('pug');
const PORT = 8080;
const Contenedor = require('./Contenedor')
const productos = new Contenedor('./productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'))

app.get('/productos', async (req, res) => {
    const listaProductos = await productos.getAll();
    res.render('lista', {productos: listaProductos});
});
app.post('/productos', (req, res) => {
    const producto = req.body;
    productos.save(producto);
    res.render('formulario', {});
});
app.get('/formproductos', (req, res) => {
    res.render('formulario', {});
});

const server = app.listen(PORT, () => {
    console.log(`Server listening: ${server.address().port}`);
});
server.on('error', error => console.log(`error ${error}`));