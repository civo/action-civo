#!/bin/sh -l
version=$(civo version)
echo "logs<<EOF" >> $GITHUB_OUTPUT
echo "Civo CLI version: $version" >> $GITHUB_OUTPUT
civo apikey save action $1 && civo apikey use action
echo "EOF" >> $GITHUB_OUTPUT