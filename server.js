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



// GET
app.get('/', async(req, res) => {
res.render('index.ejs')
})


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
