{% set cfg = opts.ms_project %}
{% set data = cfg.data %}
{% import "makina-states/services/http/nginx/init.sls" as nginx with context%}
{% import "makina-states/services/http/apache/init.sls" as apache with context%}
include:
  {% if data.apache%}
  - makina-states.services.http.apache_modproxy
{{ apache.virtualhost(data.domain,
                      cfg.data.docroot,
                      server_aliases=data.server_aliases,
                      vhost_name=cfg.name,
                      project_name=cfg.name,
                      vh_in_template_source="salt://makina-projects/{0}/files/in_virtualhost.conf".format(cfg.name)) }}

  {% else %}
  - makina-states.services.http.nginx
{% set tvhost = 'salt://makina-projects/{0}/files/nginx.top.conf'.format(cfg.name) %}
{% set vhost = 'salt://makina-projects/{0}/files/nginx.conf'.format(cfg.name) %}
{{ nginx.virtualhost(domain=data.domain,
                     server_aliases=data.server_aliases,
                     active=True,
                     doc_root=cfg.data.docroot,
                     vh_top_source=tvhost,
                     vh_content_source=vhost, vcfg=cfg) }}

{% endif %}
{{cfg.name}}-htaccess:
  file.managed:
    - name: {{data.htaccess}}
    - source: ''
    - user: www-data
    - group: www-data
    - mode: 770

{% for userdata in data.users %}
{% for user, passwd in userdata.items() %}
{{cfg.name}}-{{user}}-htaccess:
  webutil.user_exists:
    - name: {{user}}
    - password: {{passwd}}
    - htpasswd_file: {{data.htaccess}}
    - options: m
    - force: true
    - watch:
      - file: {{cfg.name}}-htaccess
    - watch_in:
      - mc_proxy: nginx-pre-conf-hook
{% endfor%}
{% endfor%}
