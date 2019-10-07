#!/bin/sh
service nodeapp stop
service nodeapp stop --force
FOLDER=$(date +%Y%m%d%H%M%S)
mkdir -p /var/www/releases/$FOLDER
tar -xf $1 -C /var/www/releases/$FOLDER
rm -f /var/www/bundle
ln -s /var/www/releases/$FOLDER/bundle /var/www/bundle
ln -s /var/www/node_modules /var/www/bundle/node_modules
chown -R root:root /var/www/bundle
service nodeapp start
