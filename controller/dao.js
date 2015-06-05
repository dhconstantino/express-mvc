/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   04/06/15 17:22
 * Descripción: dao.js: Define operaciones básicas CRUD.
 */
var Db = require('../db'),
    dbname = Db.name();
var urlDB = 'mongodb://' + Db.host() + ':' + Db.port() + '/' + Db.name();
var mongoclient;

Db.connect(urlDB, function(err) {
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
                console.log("[ERROR] No se pudo realizar la operación .insertOne()");
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
                console.log("[ERROR] No se pudo realizar la operación .findOne()");
                done(err);
            }
            else {
                done();
            }
        });
    });
    mongoclient.close();
};
exports.update  = function(collection, query, update, done) {};
exports.delete  = function(collection, query, done) {};