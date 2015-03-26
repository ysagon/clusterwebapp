var orm = require('orm');
var async = require('async');


function createModel(rows, model, cb){
   async.each(rows, function(row, callback){
     model.create(row, function(err, items){
       if (err){
         console.log('Erreur ' + err);
       }
       callback();
     });
   }, function(err){
        console.log('insertion done')
        cb();
      });
}

function insertNode(db, node, cb){
   db.models.vendor.find({name: node.vendor}).first(function(err, myVendor){
     //if(err) return cb('find error: ' + err);
     if(err) return console.error('find error: ' + err);
     db.models.cpu.find({name: node.cpu}).first(function(err, myCpu){
       if(err) return console.error('find error: ' + err);
       db.models.cluster.find({name: node.cluster}).first(function(err, myCluster){
         if(err) return console.error('find error: ' + err);
         db.models.owner.find({name: node.owner}).first(function(err, myOwner){
           if(err) return console.error('find error: ' + err);
           var nodes = [];
           nodes.push({serial: node.serial, 
                       nb_cpu: node.nb_cpu, 
                       hostname: node.hostname, 
                       mem: node.mem, 
                       cpu: myCpu, 
                       vendor: myVendor, 
                       owner: myOwner, 
                       cluster: myCluster});
           createModel(nodes, db.models.nodes, cb);
         });
       });
     }); 
  });
}

orm.connect('sqlite:inventory.db', function(err, db){
   if(err) return console.error('Connection error: ' + err);
   db.load("./models.js", function(err){
      if(err) return console.error('load models error: ' + err);
      var Vendor = db.models.vendor; 
      var Cpu = db.models.cpu; 
      var Cluster = db.models.cluster; 
      var Owner = db.models.owner; 
      var Nodes = db.models.nodes;

      var vendors = [];
      var cpus = [];
      var clusters = [];
      var owners = [];
      var nodes = [];

      vendors.push({name: 'Dalco AG'});
      cpus.push({name: 'X5671', nc_core: 2, freq: 2.67});
      owners.push({name: 'DPT'});
      owners.push({name: 'CUI'});
      owners.push({name: 'DiSTIC'});
      clusters.push({name: 'Baobab'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'server1', mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'asdf'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'node001', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.101'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'node002', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'asdf'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'node003', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'asdf'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'node004', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'asdf'});
      nodes.push({vendor: 'Dalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'node005', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'asdf'});

      db.sync(function(){
        async.parallel([
          function(callback){
            createModel(vendors, Vendor, callback);
          },
          function(callback){
            createModel(cpus, Cpu, callback);
          },
          function(callback){
            createModel(owners, Owner, callback);
          },
          function(callback){
            createModel(clusters, Cluster, callback);
          }
        ], function(err, results){
              for (i=0; i<nodes.length; i++){
                //insertNode(db, {vendor: 'Daalco AG', cpu: 'X5671', nb_cpu: 2, hostname: 'server1', mem: 32, cluster: 'Baobab', owner: 'DPT', serial: 'asdf'}, function(){});
                insertNode(db, nodes[i], function(){});
              }
           }
        );
      });
    });
});
