#!/bin/sh -l

#  Downlaod the civo cli
curl -sL https://civo.com/get | sh


echo ">>> Adding the civo api key" >> $GITHUB_OUTPUT

civo apikey save action $1
civo apikey use action

echo ">>> Successfully logged into civo" >> $GITHUB_OUTPUT 