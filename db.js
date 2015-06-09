/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   03/06/15 11:29
 */
var MongoClient = require('mongodb').MongoClient;
var state = {
    db:null,
    uri: 'mongodb://localhost:27017/testdb'
};

exports.get     = function() {
    return state.db;
};

exports.getURI   = function() {
    return state.uri;
};

exports.connect = function(uri, done) {
    if (state.db) {
        return done();
    }

    MongoClient.connect(uri, function(err, db) {
        if(err) {
            return done(err);
        }
        state.db = db;
        done();
    });
};

exports.close   = function(done) {
    if(state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
};