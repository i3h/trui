#!/bin/bash
docker kill trui
docker rm trui
docker run  -d \
	--network="host" \
	--restart always \
	--name trui \
	trui:latest
