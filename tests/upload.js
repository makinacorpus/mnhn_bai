/*
* casper upload test
*/
var URL = 'http://bai.makina-corpus.net/';
var USERNAME = 'root';
var PASSWORD = 'foo';
var U = 'admin';
var P = 'admin';
var casper = require('casper').create({
    "logLevel": "debug",
    "localToRemoteUrlAccessEnabled" : true,
    "verbose": true});

casper.start(URL);

function timeout() {this.echo("ERROR -- Timeout !").exit(1);}

casper.setHttpAuth(USERNAME, PASSWORD);

casper.then(function enterlog(){casper.click('a[href="/login"]');});

casper.then(function login(){
    return this.waitFor(
        function testlog(){return this.exists('input[name="username"]')},
        function log(){return this.fill('form', {'username': U, 'password': P}, true)},
        timeout);
});

casper.then(function entergal(){return this.click('a[href="/gallery/1"]');});

casper.then(function gal(){
    return this.waitFor(
        function testgal(){return this.exists('div.card')},
        function entergal(){return this.click('div.card a')},
        timeout);
});

casper.then(function edit(){
    return this.waitFor(
        function testedit(){return this.exists('div.edit')},
        function enteredit(){return this.click('div.edit a')},
        timeout);
});

casper.then(function mod(){
    return this.waitFor(
        function testmod(){return this.exists('select#gallery option[value="1"]')},

        function editmod(){return this.fill('#edit_form', {"gallery": "Galerie principale",
                                                    "media_files": '15mo'},
                                     true)},
        timeout)
});

casper.then(function(){casper.exit(0)});

casper.run();
