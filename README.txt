 1. meteor create trendmicro
 2. create folders: both, client, public, server

 3. bower init =>
     {
       "name": "Trend Micro Web App",
       "version": "0.0.1",
       "authors": [
         "parvez <parvez_tanaji@trendmicro.com>"
       ],
       "directory": "public/components",
       "license": "Copyright (c) 2015. All Rights Reserved.",
       "homepage": "http://www.trendmicro.com",
       "private": true,
       "ignore": [
         "**/.*",
         "node_modules",
         "bower_components",
         "test",
         "tests"
       ]
     }
 4. create .bowerrc =>
     {
       "directory": "public/components/"
     }

 5. meteor add iron:router                                                # https://github.com/iron-meteor/iron-router/blob/devel/Guide.md
    meteor add less
    meteor add coffeescript
    meteor add differential:vulcanize
    meteor add meteorhacks:inject-initial
    meteor add fortawesome:fontawesome
    meteor add materialize:materialize
    meteor add multiply:iron-router-progress
    meteor add jchristman:tagsinput-autocomplete
    meteor add aramk:tree
    meteor add aramk:jqtree
    meteor add aramk:utility
    meteor add aldeed:simple-schema
    meteor add peppelg:bootstrap-3-modal
    meteor add twbs:bootstrap
    meteor add mrt:bootstrap-select
    meteor add mizzao:autocomplete

 6. Create both/routes.coffee

 7. VULCANIZE=true meteor

 8. Server deploy scripts are in /deploy
 9. Builds are in /build
    meteor build ./build/ --architecture os.linux.x86_64
    scp ./build/iwsh_1.tar.gz root@10.202.240.14:/root
    ssh root@10.202.240.14
    /root/deploy.sh /root/iwsh_1.tar.gz

   Folder /var/www/ contents
   lrwxrwxrwx.  1 root root   39 May  8 03:50 bundle -> /var/www/releases/20150508035001/bundle
   drwxr-xr-x.  7 root root 4.0K May  7 18:41 node_modules
   drwxr-xr-x.  5 root root 4.0K May  8 03:50 releases

10. netstat -tulpn | grep :80                                            # check which process is running port 80
