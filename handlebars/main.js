const express = require('express');
const app = express();
const PORT = 8080;
const hanlebars = require('express-handlebars');
const Contenedor = require('./Contenedor')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', hanlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + 'views'
}));

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/static', express.static(__dirname + '/public'));

const productos = new Contenedor([]);

app.get('/productos', (req, res) => {
    const listaProductos = productos.getAll();
    res.render('lista', {
        productos: listaProductos
    });
});
app.post('/productos', (req, res) => {
    const producto = req.body;
    productos.save(producto);
    res.render('formulario', {});
});
app.get('', (req, res) => {
    res.render('formulario', {});
});

const server = app.listen(PORT, () => {
    console.log(`Server listening: ${server.address().port}`);
});
server.on('error', error => console.log(`error ${error}`));