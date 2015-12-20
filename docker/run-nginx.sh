#!/bin/bash

cd /etc/nginx/sites-enabled;
rm default
ln -s /etc/nginx/sites-available/gosuempire gosuempire
/usr/sbin/nginx