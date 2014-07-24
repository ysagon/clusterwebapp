===================
Slurm web interface
===================

Introduction
===============
The slurm web interface allows the users of a slurm cluster to see the status of the cluster.
Currently, the interface provide the following information:
- partition
- running jobs
- pending jobs
- reservations
- history (needs slurmdbd)

Installation
============
You need node.js. You can either install it using your favorite tool (yum, apt) or compile it from source.

Install node from source
------------------------
::

 wget http://nodejs.org/dist/v0.10.21/node-v0.10.21.tar.gz
 tar xf node-v0.10.21.tar.gz
 cd node-v0.10.21
 ./configure --prefix=/opt/nodejs
 make -j5
 su -c "make install"
 vi ~/.bash_profile
 add => PATH=$PATH:/opt/nodejs/bin
 save&quit
 logout
 login
 node --version
 echo: v0.10.21

Install the project dependencies
--------------------------------
The node dependencies are installed using npm.
::

 npm update

The js dependencies are installed using bower. There is a task in grunt that do all the initial stuff:
::

 grunt provisionning

Go production
-------------
Once all the dependencies are installed, you can optimize the files for production by doing:
::

 grunt production


Configure apache
----------------
The application listen on port 3000 on localhost. To serve to content outside, you can for example use apache reverse proxy.
::

 <Location /iface>
  ProxyPass          http://localhost:3000
  ProxyPassReverse   http://localhost:3000
 </Location>

Configure shibboleth
--------------------
The authentication is done by shibboleth through apache. Here is the part needed for the application:
::

 <Location /iface>
     AuthType Shibboleth
     ShibRequestSetting requireSession true
     Require shibboleth
     ShibUseHeaders On
 </Location>

Configure the application
-------------------------
You can specify the urlroot of your installation in app.js

Running the application
=======================
::

 NODE_ENV=development node app.js
 NODE_ENV=production node app.js

Restart the application
::

 kill -2 PID

Deploy the application
======================
::

 su nodeapp -c "./update.sh"
 cp scripts/iface.conf /etc/init/
 start iface
