{% import "makina-states/services/monitoring/circus/macros.jinja" as circus  with context %}
{% set cfg = opts.ms_project %}
{% set data = cfg.data %}
{% set scfg = salt['mc_utils.json_dump'](cfg) %}
include:
  - makina-states.services.monitoring.circus

echo restart:
  cmd.run:
    - watch_in:
      - mc_proxy: circus-pre-conf

{{cfg.name}}-config:
  file.managed:
    - name: {{cfg.project_root}}/config/env/production.js
    - source: salt://makina-projects/{{cfg.name}}/files/config.json.in
    - user: {{cfg.user}}
    - group: {{cfg.user}}
    - mode: 770
    - template: jinja
    - use_vt: true
    - defaults:
        data: |
              {{scfg}}

{{cfg.name}}-install:
  cmd.run:
    - name: {{data.npm}} install
    - cwd: {{cfg.project_root}}
    - user: {{cfg.user}}
    - env:
        PATH: {{data.PATH}}
    - use_vt: true
    - watch:
      - file: {{cfg.name}}-config

{{cfg.name}}-envsh:
  file.managed:
    - name: {{cfg.project_root}}/env.sh
    - contents: |
                PATH={{data.node_bin}}:{{data.project_bin}}:${PATH}
    - mode: 644
    - user: {{cfg.user}}
    - group: {{cfg.group}}

{% set circus_data = {
    "uid": cfg.user,
    "gid": cfg.group,
    "cmd": ("sails lift --prod").format(data.node),
    "copy_env": True,
    "working_dir": cfg.project_root,
    "warmup_delay": "10",
    "environment": {"PATH": data.PATH},
    "max_age": 24*60*60 } %}
{{ circus.circusAddWatcher(cfg.name+"-bai", **circus_data) }}


# cleanup old node upload files
/etc/cron.d/{{cfg.name}}cleanup:
  file.managed:
    - user: root
    - group: root
    - mode: 750
    - contents: |
                # purge temp files" 
                "*/30 * * * * root find "{{data.upload}}" -mmin +30|while read i;do rm -f "${i}";done

{#
{{cfg.name}}-cron-cmd:
  file.managed:
    - name: "{{cfg.data_root}}/bin/cleanup_cron.sh"
    - makedirs: true
    - contents: |
                #!/usr/bin/env bash
                LOG="{{cfg.data_root}}/cron.log"
                lock="${0}.lock"
                if [ -e "${lock}" ];then
                  echo "Locked ${0}";exit 1
                fi
                touch "${lock}"
                salt-call --local --out-file="${LOG}" --retcode-passthrough -lall --local mc_project.run_task {{cfg.name}} task_cron 1>/dev/null 2>/dev/null
                ret="${?}"
                rm -f "${lock}"
                if [ "x${ret}" != "x0" ];then
                  cat "${LOG}"
                fi
                exit "${ret}"
    - user: {{cfg.user}}

{{cfg.name}}-cron:
  file.managed:
    - name: "/etc/cron.d/{{cfg.name}}cleanupcron"
    - contents: |
                #!/usr/bin/env bash
                MAILTO="{{data.admins}}"
                {{data.cron_periodicity}} root "{{cfg.data_root}}/bin/cleanup_cron.sh"
    - user: {{cfg.user}}
    - makedirs: true
    - use_vt: true
    - require:
      - file: {{cfg.name}}-cron-cmd
#}
