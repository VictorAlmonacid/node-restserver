require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json()) 


app.get('/Usuario', function (req, res) {
  res.json('get Usuario')
});

app.post('/Usuario', function (req, res) {
    let body = req.body;
    if(body.nombre === undefined){
    res.status(400).json({
        ok: false,
        mensaje: 'El nombre es necesario'
    });
    }else{
        res.json({
            body
        })
    }
  });

  app.put('/Usuario/:id', function (req, res) {
      let id = req.params.id;
    res.json({
        id
    });
  });

  app.delete('/Usuario', function (req, res) {
    res.json('delete Usuario')
  });
 
app.listen(process.env.PORT, ()=>{
console.log('Escuchando puerto: ',3000);
});