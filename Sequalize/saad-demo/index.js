import express from 'express'
const app = express() // initializes express
const port=3000

app.listen(port, () => {
    console.log('listening onn port ' + port)
})

app.get('/', (_req, res) => {
    res.json('welcome')
})
app.get('/get-obj', (_req, res) => {
    res.json({id:101,name:'irfan'})
})