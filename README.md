Boite a image
=============

'Boite a image' project is a gallery and collaborative tool for the MNHN.


How we deploy @ makina-corpus
------------------------------

We use makina-states and corpus which are thin wrappers to do saltstack based deployments.
You can have a look to the .salt directory on this repository to discover how we do it and inspire yourself for your own deployment strategy.

Installation on linux/debian
----------------------------------

You need nodejs v0.10.x at least.
We use 0.10.29+ here.
If your version is too old, please update it :

    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

After getting the sources, run :

    mkdir -p /projects/
    if [ ! -e /projects/bai/ ];then
      git clone https://github.com/makinacorpus/mnhn_bai.git /projects/bai/
    else
      cd /projects/bai/
      git pull --rebase origin/master
    fi
    cd /projects/bai/
    npm install

You need to create postgres database too, called for example 'bai'.

Configure your setting by editing config/env/production.js:

    module.exports.data {...}
    module.exports.connections {...}

If you are running a dev instance, create a symlink for the upoad directory :

    cd /projects/bai/assets/
    ln -s ../.tmp/uploads/ .

nodejs process management
--------------------------
You will need a proccess manager like forever, supervisor or circusd to maintain your node worker alive and healthy.
Exemple circusd worker :

  [watcher:bai-bai]
  cmd = sails lift --prod
  max_age = 86400
  uid = bai-user
  copy_env = True
  warmup_delay = 10
  working_dir = /projects/bai/
  gid = editor
  stdout_stream.class = WatchedFileStream
  stdout_stream.filename = /var/log/circus/bai-bai.stdout.log
  stdout_stream.time_format = %Y-%m-%d %H:%M:%S
  stdout_stream.max_bytes = 26214400
  stdout_stream.backup_count = 5
  stderr_stream.class = WatchedFileStream
  stderr_stream.filename = /var/log/circus/bai-bai.stderr.log
  stderr_stream.time_format = %Y-%m-%d %H:%M:%S
  stderr_stream.max_bytes = 26214400
  stderr_stream.backup_count = 5
  [env:bai-bai]
  PATH = /projects/bai/node_modules/.bin:/srv/apps/node/0.10.29/bin:/usr/local//sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

Example nginx reverse proxy configuration
-------------------------------------------
Example conf :

  geo $dont_show_nginx_status {
      default 1;
      127.0.0.1 0; # allow on the loopback
      192.168.0.0/16 0; # allow lan
      10.0.0.0/8 0; # allow lan
  }
  server {
      listen 80;
      server_name bai.makina-corpus.net;
      server_name_in_redirect on;
      error_log /var/log/nginx/foo_makina_corpus_net-error.log crit;
      access_log  /var/log/nginx/foo_makina_corpus_net-access.log custom_combined;
      # set_real_ip_from   10.5.0.1;
      # real_ip_header X-Forwarded-For;
      # Member features should be over ssl
      root /srv/projects/blocation /nginx_status {
        auth_basic off;
        if ($dont_show_nginx_status) {
            return 404;
        }
        stub_status on;
        access_log off;
      }
      # auth_basic            "Restricted";
      # auth_basic_user_file  /etc/nginx/bai.access;
      location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_redirect off;
        include /etc/nginx/proxy_params;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
      }
  }

Log rotation
------------
Be sure to rotage your logs, specially the process managment application ones.

Launch the server
-----------------
For tests:

    sails lift --prod

In production, launch your process management facility (supervisor, circus, or whatever)
