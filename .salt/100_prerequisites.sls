{% import "makina-states/localsettings/nodejs/prefix/prerequisites.sls" as node with context %}
{% set cfg = opts.ms_project %}
{% set data = cfg.data %}
{% set pkgssettings = salt['mc_pkgs.settings']() %}
{% if grains['os_family'] in ['Debian'] %}
{% set dist = pkgssettings.udist %}
{% endif %}
{% if grains['os'] in ['Debian'] %}
{% set dist = pkgssettings.ubuntu_lts %}
{% endif %}

include:
  - makina-states.localsettings.nodejs

{{cfg.name}}-prereqs:
  pkg.latest:
    - pkgs:
      - nodejs
      - apache2-utils
      - libpq-dev
      - sqlite3
      - libsqlite3-dev

{{cfg.name}}-directories:
  file.directory:
    - watch:
      - pkg: {{cfg.name}}-prereqs
    - names:
      - {{data.docroot}}
      - {{data.tmp}}
      - {{data.data}}
      - {{data.upload}}
    - user: {{cfg.user}}
    - group: {{cfg.group}}
{{cfg.name}}-upload-www:
  file.symlink:
    - name: {{cfg.project_root}}/.tmp/public/uploads
    - target: {{cfg.data_root}}/.tmp/uploads
    - makedirs: true
    - watch:
      - file: {{cfg.name}}-directories
{{cfg.name}}-upload:
  file.symlink:
    - name: {{cfg.project_root}}/.tmp/uploads
    - target: {{cfg.data_root}}/data
    - makedirs: true
    - watch:
      - file: {{cfg.name}}-directories

{{ node.install(data.node_version, hash=data.node_hash) }}
