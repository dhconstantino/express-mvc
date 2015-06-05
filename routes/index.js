var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express MVC' });
});

router.get('/test-insert', function(req, res) {
    var result = User.find('hernandezd', function(err, data){
        res.send("data="+data);
    });

    /*User.insert('Daniel','Hernández','Constantino','hernandezd@ryclatam.com','hernandezd','s3cret','ADMIN','SISTEMAS', function(err) {
        if(err) {
            res.send("HA OCURRIDO UN ERROR AL CREAR EL USUARIO DE PRUEBA");
        }
        else {
            res.send("USUARIO DE PRUEBA CREADO CORRECTAMENTE!");
        }
    });*/
});
module.exports = router;
