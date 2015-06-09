/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   04/06/15 17:22
 * Descripción: dao.js: Define operaciones básicas CRUD.
 */
var Db = require('../db');
var uri = Db.getURI();
var dbname = uri.split('/')[3];
var mongoclient;

Db.connect(uri, function(err) {
    if(err) {
        console.log('[ERROR] Falló la conexión con la BD');
    }
    else {
        mongoclient = Db.get();
    }
});

exports.insert  = function(collection, document, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).insertOne(document, function(err) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .insertOne()');
                done(err);
            }
            else {
                done();
            }
        });
    });
    mongoclient.close();
};

exports.find    = function(collection, query, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).findOne(query, function(err, data) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .findOne()');
            }
            done(err, data);
        });
    });
    mongoclient.close();
};

exports.update  = function(collection, query, update, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).updateOne(query, update, function(err) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .update()');
            }
            done();
        });
        /*db.collection(collection, function(err, col) {
            col.update(query, update, cb);
        });*/
        /*db.collection(collection).update(query, update, function (err) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .update()');
            }
            done();
        });*/
    });
    mongoclient.close();
};

exports.delete  = function(collection, query, done) {};