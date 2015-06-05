var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

router.route('/acceso')
    .get(function(req, res) {
        (req.session.activeSession===1)?res.redirect('/'):res.render('login');
    })
    .post(
    function(req, res, next) {
        var usr     = req.body.inpUsuario;
        var pwd     = req.body.inpClave;
        var ssn;

        User.login(usr,pwd, function(){

        });
        req.db.get('usercollection').find({$and:[{usuario:usr},{clave:pwd}]}, function(error, data) {
            if(error) {
                res.render('error', {
                    type:      'Error de acceso',
                    estatus:    500,
                    message:    'No fue posible validar el acceso.'
                });
                console.log("[ERROR]: " + error + "\nFalló el primer filtro de consulta.");
            }
            else {
                if(0===data.length){
                    // No se encontró usuario/password en la BD. REDIRIGIR a /acceso (...FIN)
                    console.log("[DEBUG] Filtro 1: data.length==0 ==> Usuario y Password no encontrados. Redirección a: '/acceso'. FIN");
                    res.render('login', {errorCode: 1});
                }
                else {
                    // Usuario y password encontrados: Inicializar sesión y continuar
                    console.log("[DEBUG] Filtro 1: data.length!=0 ==> Usuario y Password encontrados! Inicializa sesión. Siguiente: Validar Si existe sesión.");
                    req.session;
                    req.session.username = data[0].usuario;
                    req.session.profile = data[0].perfil;
                    next();
                }
            }
        });
    },
    function(req, res, next) {
        var usr;
        ("undefined"===typeof(req.session.username))?usr=req.body.inpUsuario:usr=req.session.username;

        req.db.get('sessions').find({"session.username": usr}, function(error, data) {
            if(error) {
                res.render('error', {
                    type:      'Error de acceso',
                    estatus:    500,
                    message:    'No fue posible validar el acceso.'
                });
                console.log("[ERROR]: " + error + "\nFalló el segundo filtro de consulta.");
            }
            else {
                if(0===data.length) {
                    // No se encontró el usuario en "sessions" ==> Asignar variables de sesión y REDIRIGIR a / (...FIN)
                    console.log("[DEBUG] Filtro 2: data.length==0 ==> No existe sesión del Usuario en BD. Sesión: sid, lastAccess y activeSession. Redirección a: /. FIN");
                    req.session.sid         = req.sessionID;
                    req.session.lastAccess  = new Date();
                    req.session.activeSession = 1;
                    res.redirect('/');
                }
                else {
                    // Se encontró una sesión activa para el Usuario ==> Validar sesión única
                    console.log("[DEBUG] Filtro 2: data.length!=0 ==> Se encontró sesión del usuario. Siguiente: Validar unicidad de sesión (session.username+session._id)");
                    next();
                }
            }
        });

    },
    function(req, res) {
        req.db.get('sessions')
            .find({$and:[{"session.username":req.session.username},{"session.sid":req.sessionID}]},
            function(error, data) {
                if(error) {
                    res.render('error', {
                        type:      'Error de acceso',
                        estatus:    500,
                        message:    'No fue posible validar el acceso.'
                    });
                    console.log("[ERROR]: " + error + "\nFalló el tercer filtro de consulta.");
                }
                else {
                    if(0===data.length) {
                        // No se encontró coincidencia: session.username+session.sid ==> Sesión no válida. REDIRIGIR a /acceso (...FIN)
                        console.log("[DEBUG] Filtro 3: data.length==0 ==> La sesión no es válida, no se permite usuario múltiple. Destruir sesión. Redirección a: /acceso. FIN");
                        req.session.destroy();
                        res.clearCookie('connect.sid',{path: '/'}).render('login', {errorCode: 2});
                    }
                    else {
                        // El usuario y el id de sesión coinciden ==> Sesión válida. REDIRIGIR a / (...FIN)
                        res.redirect('/');
                    }
                }
            }
        );
    });

module.exports = router;
