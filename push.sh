#!/usr/bin/env bash

git add --all

git commit -am "$(date '+%Y-%m-%d %H:%M:%S') default commit message"

git push
