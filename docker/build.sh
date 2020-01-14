#!/bin/bash
docker images -q --filter dangling=true | xargs docker rmi
docker build . -t "trui:latest"
