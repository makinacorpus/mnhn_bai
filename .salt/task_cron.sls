{% set cfg = opts.ms_project %}
{% set data = cfg.data %}
{% set scfg = salt['mc_utils.json_dump'](cfg) %}

clean:
  cmd.run:
    - name: /bin/test
    - user: root
