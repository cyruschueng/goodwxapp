#!/usr/bin/env bash

cd /data1/application/services/docker-compose
docker-compose stop
docker-compose rm -f
docker-compose up -d
docker-compose ps
