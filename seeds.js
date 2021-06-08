const product = require('./models/product')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStall', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log(err);
})

const seedproducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

product.insertMany(seedproducts)
    .then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })