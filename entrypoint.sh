#!/bin/sh -l
echo "logs<<EOF" >> $GITHUB_OUTPUT

version=$(civo version)
curl -sL https://civo.com/get | sh

echo "Civo CLI version: $version" >> $GITHUB_OUTPUT
civo apikey save action $1 && civo apikey use action

echo "EOF" >> $GITHUB_OUTPUT