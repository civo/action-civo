#!/bin/sh -l
version=$(civo version)
echo "$version" >> $GITHUB_OUTPUT
civo apikey save action $1 && civo apikey use action