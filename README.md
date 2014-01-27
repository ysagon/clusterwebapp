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
The dependencies are installed using npm.
::

 npm update

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

Running the application
=======================
::

 node app.js
