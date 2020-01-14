#
# Build stage
#
FROM golang:1.13-alpine as build

# args
ARG version="1.0.4"

# build root
WORKDIR /build
ADD ./main.go ./

# build & test
RUN apk add --no-cache git curl wget ca-certificates \
    && echo -e "module caddy\nrequire github.com/caddyserver/caddy v${version}" > go.mod \
    && CGO_ENABLED=0 GOOS=linux GO111MODULE=on go build \
    && ./caddy -version
RUN curl -s https://api.github.com/repos/noobly314/trui/releases/latest \
    | grep -o "browser_download_url.*gz" \
    | grep -o "https.*gz" \
    | wget -qi - \
    && tar xzf trui.tar.gz

#
# Final image
#
FROM scratch

# copy binary
COPY --from=build /build/caddy /bin/caddy
COPY --from=build /build/trui /srv/trui

# copy default caddyfile
COPY Caddyfile /etc/Caddyfile

# set default caddypath
ENV CADDYPATH=/etc/.caddy
VOLUME /etc/.caddy

# serve from /srv
WORKDIR /srv
EXPOSE 80

ENTRYPOINT ["/bin/caddy", "--conf", "/etc/Caddyfile", "--log", "stdout"]
