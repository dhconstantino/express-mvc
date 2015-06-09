/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   08/06/15 12:22
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/user-insert', function(req, res) {
    User.insert(
        'Daniel','Hernández','Constantino','hernandezd@ryclatam.com','hernandezd','s3cret','ADMIN','SISTEMAS',
        function(err) {
            if(err) {
                res.send('ERROR: Ha ocurrido un error al crear el usuario de prueba');
            }
             else {
                res.send('OK!: Usuario de prueba creado exitosamente!');
             }
        }
    );
});

router.get('/user-find', function(req, res) {
    User.find('hernandezd', function(err, data){
        if(err) {
            res.send('ERROR: No se pudo realizar la consulta');
        }
        else if(!data) {
            res.send('ADVERTENCIA: No se encontró el usuario');
        }
        else {
            res.send(
                'nombre=' + data.nombre + '\n' +
                ', aPaterno=' + data.aPaterno + '\n' +
                ', aMaterno=' + data.aMaterno + '\n' +
                ', area=' + data.area + '\n' +
                ', perfil=' + data.perfil + '\n' +
                ', estatus=' + data.estatus
            );
        }
    });
});

router.get('/user-update', function(req, res) {
    User.update('hernandezd', {nombre: 'Oscar'}, function(err) {
        if(err) {
            res.send('ERROR: No se pudo realizar la actualización');
        }
        else {
            res.send('OK!: Usuario actualizado correctamente!');
        }
    })
});

router.get('/user-login', function(req, res) {
    User.login('hernandezd','s3cret', function(err, data) {
        if(err) {
            res.send('ERROR: No fue posible validar las credenciales de autenticación');
        }
        else if(!data) {
            res.send('CREDENCIALES NO VÁLIDAS: El usuario y/o la contraseña son incorrectos, por favor verifique');
        }
        else {
            res.send('OK!: Autenticación exitosa! Ahora es posible iniciar una sesión');
        }
    })
});

router.get('/user-remove', function(req, res) {
    User.remove('hernandezd', function(err) {
        if(err) {
            res.send('ERROR: No fue posible eliminar al usuario');
        }
        else {
            res.send('OK!: El usuario ha sido dado de baja del sistema')
        }
    });
});

module.exports = router;