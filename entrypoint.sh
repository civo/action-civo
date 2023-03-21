#!/bin/sh -l
echo "/usr/local/bin" >> $GITHUB_PATH

echo "logs<<EOF" >> $GITHUB_OUTPUT

curl -sL https://civo.com/get | sh
version=$(civo version)

echo "Civo CLI version: $version" >> $GITHUB_OUTPUT
civo apikey save action $1 && civo apikey use action

echo "EOF" >> $GITHUB_OUTPUT