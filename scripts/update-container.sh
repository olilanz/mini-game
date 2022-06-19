#!/usr/bin/env bash

if [ $# -lt 1 ];then
    echo Usage: `basename $0` image 1>&2
    exit 1
fi

set -e
IMAGE=$1
CID=$(docker ps | grep $IMAGE | awk '{print $1}')
docker pull $IMAGE

for im in $CID
do
    LATEST=`docker inspect --format "{{.Id}}" $IMAGE`
    RUNNING=`docker inspect --format "{{.Image}}" $im`
    NAME=`docker inspect --format '{{.Name}}' $im | sed "s/\///g"`
    echo "Latest:" $LATEST
    echo "Running:" $RUNNING
    if [ "$LATEST" != "$RUNNING" ];then
        echo "upgrading $NAME"
        docker stop $NAME
        docker rm -f $NAME
        # here, create your image
        docker start $NAME
    else
        echo "$NAME up to date"
    fi
done
