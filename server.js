if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const app = express()

app.use(express.urlencoded({limit: '10mb', extended: false}))

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('connected'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})

