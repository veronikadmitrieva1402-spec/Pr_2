const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

let products = [
    {id: 1, name: 'Платье', price: 7500 },
    {id: 2, name: 'Джинсы', price: 4300},
    {id: 3, name: 'Футболка', price: 2600}
]

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req,res) => {
    const product = products.find(p => p.id == parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({message: 'Товар не найден'});
    }
    res.json(product);
});

app.post('/products', (req, res) => {
    const {name, price} = req.body;

    if (!name || !price) {
        return res.status(404).json({message: 'Название и цена обязательны'});
    }

    const newProduct = {
        id: Date.now(),
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({message: 'Товар не найден'});
    }

    const { name, price} = req.body;

    if (name != undefined) product.name = name;
    if (price != undefined) product.price = price;

    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const product = products.findIndex(p => p.id == parseInt(req.params.id));

    if (product === -1) {
        return res.status(404).json({message: 'Товар не найден'});
    }

    products.splice(product, 1);
    res.json({message: 'Товар удален'});
});


app.get('/', (req, res) => {
    res.send('Сервер работает');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});



