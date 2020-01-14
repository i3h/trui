FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl wget nginx
RUN curl -s https://api.github.com/repos/noobly314/trui/releases/latest \
    | grep -o "browser_download_url.*gz" \
    | grep -o "https.*gz" \
    | wget -qi - \
    && tar xzf trui.tar.gz \
    && mv trui /var/www \
    && sed -i '/sites-enabled/d' /etc/nginx/nginx.conf \
    && echo 'server {\n\
            listen 80;\n\
            index index.html;\n\
            root /var/www/trui;\n\
            location / {\n\
            try_files $uri $uri/ /index.html;\n\
            }\n\
            location /transmission/rpc {\n\
                     proxy_pass         http://localhost:9091;\n\
                     proxy_redirect      off;\n\
                     proxy_set_header    Host            $host;\n\
                     proxy_set_header    X-Real-IP       $remote_addr;\n\
                     proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            }\n\
            location /transmission/web {\n\
                     proxy_pass         http://localhost:9091;\n\
                     proxy_redirect      off;\n\
                     proxy_set_header    Host            $host;\n\
                     proxy_set_header    X-Real-IP       $remote_addr;\n\
                     proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            }\n\
    }\n'\
    >> /etc/nginx/conf.d/trui.conf
EXPOSE 80
CMD nginx -g "daemon off;"
