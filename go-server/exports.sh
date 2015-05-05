#!/usr/bin/env bash
# source this file in current dir


# one liner to get path of 
# script no matter where it is called from
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export GOPATH=$DIR

export CHROME_BIN=`which chromium`
if [ -z "$CHROME_BIN" ] 
then
    export CHROME_BIN=`which google-chrome`
fi

export PATH=$PATH:$DIR/client/static/js/node_modules/karma/bin
