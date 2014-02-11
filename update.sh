#!/bin/bash
git pull
bower install
npm install
cp custom/variables.less public/bower_components/bootstrap/less/
cd public/bower_components/bootstrap/
make
