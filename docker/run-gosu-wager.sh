#!/bin/bash

echo "moving directory";
cd /opt/sc2-bet/app;
echo "running grails app";
exec grails prod run-app
