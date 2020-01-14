FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl wget nginx \
    && curl -s https://api.github.com/repos/noobly314/seedbox/releases/latest \
       | grep -o "browser_download_url.*gz" \
       | grep -o "https.*gz" \
       | wget -qi - \
    && tar xzf seedbox.tar.gz \
    && mv seedbox /var/www \
    && pwd; ls /var/www/seedbox
EXPOSE 80
ENTRYPOINT ["sh"]
