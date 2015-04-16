#!/usr/bin/env bash
# source this file in current dir

export GOPATH=`pwd`

export CHROME_BIN=`which chromium`
if [ -z "$CHROME_BIN" ] 
then
    export CHROME_BIN=`which google-chrome`
fi

export PATH=$PATH:`pwd`/client/static/js/node_modules/karma/bin
