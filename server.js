const dotenv = require('dotenv')
dotenv.config() 

const express = require('express');
const mongoose = require('mongoose')  //importing packages

const app = express(); //when we import express, we must call express 

mongoose.connect(process.env.MONGODB_URI) //process.env is looking into env file and looking for variable called MONGODB_URI

mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`) //shows we are connected to MongoDB atlas
})

const Fruit = require('./models/fruit.js')

// middleware
app.use(express.urlencoded({ extended: false }));


// GET
app.get('/', async(req, res) => {
res.render('index.ejs')
})

//GET/ fruits 
app.get('/fruits', async(req, res) => {
    const allFruits = await Fruit.find({})
    console.log(allFruits)
    res.render('fruits/index.ejs', { fruits: allFruits})
})

// GET /fruits/new 
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

// POST/fruits 
app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }

      await Fruit.create(req.body);
      res.redirect("/fruits");
    })


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
