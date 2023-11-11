var express = require('express');
var router = express.Router();
const fs = require('fs');
var cors = require("cors");

router.use(cors());
router.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');

  fs.readFile('horarioSalvo.json', function leArquivo(erro, data) {

    if (erro) {
        console.log(erro);
    } else {
        json = JSON.parse(data);
        res.json(json);
    }
  });
});

router.put('/', function(req, res) {
  let obj = {"hora": req.body.hora, "minutos": req.body.minutos};
  let json = JSON.stringify(obj);
  fs.writeFileSync('horarioSalvo.json', json);
});

module.exports = router;
