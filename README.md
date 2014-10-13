Boite a image
=============

'Boite a image' project is a gallery and collaborative tool for the MNHN.


Installation on linux
---------------------

You need nodejs v0.10.x at least.
If your version is too old, please update it :

    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

After getting the sources, run :

    cd ~/mnhn_bai/
    sudo npm install


You need to create postgres database too, called 'bai'.

Configure your setting by editing config/env/production.js
    module.exports.data {...}
    module.exports.connections {...}

Create a symlink for the upoad directory :

    cd ~/mnhn_bai/assets/
    ln -s ../.tmp/uploads/ .

Create a symlink for the data directory :

    cd ~/mnhn_bai/assets/
    ln -s ../.tmp/data/ .
    

Launch the server
-----------------

    sails lift --prod


