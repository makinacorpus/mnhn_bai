/*
* casper upload test
*/
var URL = 'http://bai.makina-corpus.net/';
var USERNAME = 'root';
var PASSWORD = 'foo';
var U = 'admin';
var P = 'admin';
var casper = require('casper').create({
    "pageSettings": {"userName": USERNAME, "password": PASSWORD},
    "logLevel": "debug",
    "waitTimeout": 1000000000,
    "verbose": true});

casper.start(URL);

casper.then(function(){casper.click('a[href="/login"]');});

casper.then(function(){
    casper.waitFor(
        function (){return this.exists('input[name="username"]')},
        function (){return this.fill('form', {'username': U, 'password': P}, true)},
        5);
});

casper.then(function(){casper.click('a[href="/gallery/1"]');});

casper.then(function(){
    casper.waitFor(
        function (){return this.exists('div.card')},
        function (){return this.click('div.card a')},
        5);
});

casper.then(function(){
    casper.waitFor(
        function (){return this.exists('div.edit')},
        function (){return this.click('div.edit a')},
        5);
});

casper.then(function(){
    casper.waitFor(
        function (){return this.exists('#edit_form')},
        function (){return this.fill('#edit_form',
                                     {"media_files": '15mo'},
                                     true);},
        5);
});

casper.then(function(){
    this.debugHTML();
    this.exit();
});

casper.run();
