var orm = require('orm');
orm.connect('sqlite:inventory.db', function(err, db){
   if(err) return console.error('Connection error: ' + err);

   var Vendor = db.define('vendor', {
     id   : {type: 'serial', key: true},
     name : {type: 'text'}
   });

   var Cpu = db.define('cpu', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'},
     nb_core : {type: 'integer'},
     freq    : {type: 'number'}
   });

   var Cluster = db.define('cluster', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'}
   });

   var Owner = db.define('owner', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'}
   });

   var Nodes = db.define('nodes', {
     id       : {type: 'serial', key: true},
     serial   : {type: 'text'},
     hostname : {type: 'text'},
     nb_cpu   : {type: 'integer'},
     mem      : {type: 'integer'}
   });

   Nodes.hasOne('vendor', Vendor);
   Nodes.hasOne('cpu', Cpu);
   Nodes.hasOne('cluster', Cluster);

   Vendor.sync(function createVendorTable(){
     Vendor.create({name: 'Dalco AG'}, function(err, items){
       if (err){
         console.log('Erreur ' + err);
       }
     });
   });

  Cpu.sync(function createCPUTable(){
    Cpu.create({name: 'X5671', nb_core: 2, freq: 2.67}, function(err, items){
      if (err){
         console.log('Erreur ' + err);
       }
    });
  });

  Cluster.sync(function createClusterTable(){
    Cluster.create({name: 'Baobab'}, function(err, items){
      if (err){
         console.log('Erreur ' + err);
       }
    });
  });

  Owner.sync(function createOwnerTable(){
    Owner.create({name: 'DPT'}, function(err, items){
      if (err){
         console.log('Erreur ' + err);
       }
    });
    Owner.create({name: 'CUI'}, function(err, items){
      if (err){
         console.log('Erreur ' + err);
       }
    });
  });

  Nodes.sync(function createNodesTable(){
    Nodes.create({serial: 'S-12.12.216', nb_cpu: 2, hostname: 'server1', mem: 32}, function(err, items){
      console.log('err: ' + err);
      console.log('items: ' + items);
      if (err){
         console.log('Erreur ' + err);
       }
       Vendor.find({name: 'Dalco AG'}).first(function(err, myVendor){
         console.log('myVendor: ' + myVendor);
         items.setVendor(myVendor, function(err){
           console.log('err: ' + err);
         });
      });
    });
  });


});
