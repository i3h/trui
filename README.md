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

2. Open setting and edit your RPC endpoint of transmission-daemon. Please visit rpc address in browser to make sure it works properly. You should see 409 Conflict error.

```
A typical transmission rpc address looks like:
http://seedbox/transmission/rpc
```

3. Serve seedbox static files with Nginx, Apache or whatever you like. Please note that **transmission rpc and your web service must have same origin (scheme, hostname and port)**.

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
                proxy_pass         http://localhost:9091;
                proxy_redirect      off;
                proxy_set_header    Host            $host;
                proxy_set_header    X-Real-IP       $remote_addr;
                proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        # You need to setup reverse proxy for transmission rpc

}

```

</details>

# Upgrade

When a new release is available, feel free to replace files in your serving directory.

RPC setting is stored in your browser, so it will not be lost after reinstall.

# License

See the [LICENSE](https://github.com/noobly314/seedbox/blob/master/LICENSE.md) file for license rights and limitations (MIT).
