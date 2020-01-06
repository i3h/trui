# Introduction

Seedbox is a Web UI designed for [Transmission](https://github.com/transmission/transmission), with newer and nicer look.

# Features

- [x] Basic actions including start, stop, upload and delete torrents
- [x] Showing details of specific torrent
- [x] Mobile friendly UI
- [ ] More setting options provided by original web interface

# Installation

1. Download latest [release](https://github.com/noobly314/seedbox/releases/latest) and extract it to the directory where you will serve static files.

2. Edit the configuration file named `appConfig.json`. Replace your own RPC endpoint of transmission-daemon in this file. Please visit rpc address in browser to make sure it works properly. You should see 409 Conflict error.

```
// replace api
{
  "api": "http://seedbox/transmission/rpc"
}
```

3. Serve seedbox static files with Nginx, Apache or whatever you like. Please note that the scheme, hostname and port of rpc must be same with those of your web service. Transmission does not support CORS for security reason, so you must follow this rule.

```
// Nginx example configuration
server {
        listen 80;
        server_name seedbox;

        index index.html;
        root /var/www/seedbox;

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
}
```

# Demo

![demo1](demo/seedbox-demo-1.png)

![demo2](demo/seedbox-demo-2.png)

# License

See the [LICENSE](https://github.com/noobly314/seedbox/blob/master/LICENSE.md) file for license rights and limitations (MIT).
