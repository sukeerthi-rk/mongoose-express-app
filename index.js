const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
const product = require('./models/product')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStall', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log(err);
})

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const Products = await product.find({ category })
        res.render('products/index', { Products, category })
    } else {
        const Products = await product.find({})
        res.render('products/index', { Products, category: 'All' })
    }

})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const Product = await product.findById(id)
    res.render('products/details', { Product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const Product = await product.findById(id)
    res.render('products/edit', { Product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const Product = await product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true, useFindAndModify: false })
    res.redirect(`/products/${Product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const Product = await product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})