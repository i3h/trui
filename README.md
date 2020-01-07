![License](https://img.shields.io/github/license/noobly314/seedbox)
![Build](https://img.shields.io/github/workflow/status/noobly314/seedbox/build)
![Release](https://img.shields.io/github/v/release/noobly314/seedbox)

# Introduction

Seedbox is a Web UI designed for [Transmission](https://github.com/transmission/transmission), with newer and nicer look.

# Features

- [x] Start, stop, upload and delete torrents
- [x] Mobile friendly UI
- [x] Pure html, css, js (easy to deploy and use)
- [ ] More setting options provided by original web interface

# Demo

![demo1](demo/seedbox-demo-1.png)

![demo2](demo/seedbox-demo-2.png)

# Installation

1. Download latest [release](https://github.com/noobly314/seedbox/releases/latest) and extract it into the directory where you will serve static files.

2. Serve seedbox static files with Nginx, Apache or whatever you like. Setup reverse proxy for transmission-daemon rpc service.

<details>
<summary>Nginx Configuration Example (click to open)</summary>

```
server {
        listen 80;
        server_name seedbox;
        # This can be either public or private IP/domain

        index index.html;
        root /var/www/seedbox;
        # This is where you put html, css, js files.

        location / {
                try_files $uri $uri/ /index.html;
        }

        location /transmission/rpc {
                proxy_pass          http://localhost:9091;
                proxy_redirect      off;
                proxy_set_header    Host            $host;
                proxy_set_header    X-Real-IP       $remote_addr;
                proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        # You need to setup reverse proxy for transmission rpc

}

```

</details>

# License

See the [LICENSE](https://github.com/noobly314/seedbox/blob/master/LICENSE.md) file for license rights and limitations (MIT).
