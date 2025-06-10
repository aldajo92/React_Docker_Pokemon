#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "$0")"; cd ..; pwd)"
source ${PROJECT_ROOT}/config_docker.sh

docker run -it \
    --name ${DOCKER_CONTAINER_NAME} \
    --volume ${PROJECT_ROOT}/react_app:/react_app \
    -p 3000:3000 \
    --rm \
    ${DOCKER_IMAGE_NAME}
