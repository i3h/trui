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

2. Serve seedbox static files with Nginx, Apache or whatever you like. Please note that **transmission rpc and your web service must have same origin (protocol, hostname and port)**. To comply with same origin policy, you can serve html/css/js on '/' path, and use reverse proxy to serve transmission-daemon rpc service on '/transmission/rpc' path (redirect request from :80 to default :9091). More details can be found in the following example.

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

3. Visit web ui, click setting button and edit your RPC endpoint of transmission-daemon. The RPC value is stored in your browser, so you need to set it up when you use a new browser. The good side is the setting will not be lost after reinstall / upgrade. A typical transmission rpc address looks like:

```
http://seedbox/transmission/rpc
```

# License

See the [LICENSE](https://github.com/noobly314/seedbox/blob/master/LICENSE.md) file for license rights and limitations (MIT).
