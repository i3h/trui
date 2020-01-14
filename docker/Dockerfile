FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl wget nginx
RUN curl -s https://api.github.com/repos/noobly314/trui/releases/latest \
    | grep -o "browser_download_url.*gz" \
    | grep -o "https.*gz" \
    | wget -qi - \
    && tar xzf trui.tar.gz \
    && mv trui /var/www \
    && pwd; ls /var/www/trui
EXPOSE 80
ENTRYPOINT ["sh"]
