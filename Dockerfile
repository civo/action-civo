# Container image that runs your code
FROM alpine:3.10

RUN apk add --no-cache curl && curl -sL https://civo.com/get | sh
RUN echo "/usr/local/bin/civo" >> $GITHUB_PATH

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY entrypoint.sh /entrypoint.sh

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]