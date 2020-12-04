const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to database')
        const db = client.db('HugeBasket')
        const nameandPrice = db.collection('NameandPrice')
        app.set('view engine', 'ejs')
        app.listen(4000, function (req, res) {
            console.log('server is running')
        })
        app.get('/', function (req, res) {
            res.render('index.ejs')
        })
        app.get('/food', function (req, res) {
            res.render('food.ejs')
        })
        app.get('/toys', function (req, res) {
            res.render('toys.ejs')
        })

        app.set('views', __dirname + '/views');
        app.get('/cart', function (req, res) {
            db.collection('NameandPrice').find().toArray()
                .then(result => {
                    console.log(result)
                    res.render('cart.ejs', { Cart: result })
                })
                .catch(error => {
                    console.error(error)
                })
        })

        app.post('/food', function (req, res) {
            nameandPrice.insertOne(req.body)
                .then(result => {
                    res.redirect('/cart')
                })


                .catch(error => {
                    console.error(error)
                })
        })
        app.post('/toys', function (req, res) {
            nameandPrice.insertOne(req.body)
                .then(result => {
                    res.redirect('/cart')
                })


                .catch(error => {
                    console.error(error)
                })
        })
    })











