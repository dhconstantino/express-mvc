/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   03/06/15 11:29
 */
var MongoClient = require('mongodb').MongoClient;
var state = {
    db:null,
    host: 'localhost',
    port: '27017',
    name: 'testdb',
    user: '',
    pass: '',
    url: 'mongodb://localhost:27017/testdb'
};

exports.get     = function() {
    return state.db;
};

exports.host    = function() {
    return state.host;
};

exports.port    = function() {
    return state.port;
};

exports.name  = function() {
    return state.name;
};

exports.user  = function() {
    return state.user;
};

exports.pass  = function() {
    return state.pass;
};

exports.connect = function(url, done) {
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, function(err, db) {
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