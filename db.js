var orm = require('orm');
var async = require('async');

orm.connect('sqlite:inventory.db', function(err, db){
   //db.settings.set('instance.cache', false);
   if(err) return console.error('Connection error: ' + err);
   db.load("./models.js", function(err){
      if(err) return console.error('load models error: ' + err);

      var nodes = fixturesNodes();

              /*async.each(nodes, function(row, cb){
                //insertNode(db, row, cb);
                createModel(db, row, db.models.nodes, function(){console.log('inserted'); cb()});
                //insertNode(db, nodes[0], function(){console.log('inserted')});
              }, function(err){
                if(err){
                  console.log('error');
                }
                console.log('ok '); 
              });*/
      db.sync(function(){
        async.parallel([
          function(callback){
            createModels(fixturesVendors(), db.models.vendor, callback);
          },
          function(callback){
            createModels(fixturesCpus(), db.models.cpu, callback);
          },
          function(callback){
            createModels(fixturesOwners(), db.models.owner, callback);
          },
          function(callback){
            createModels(fixturesClusters(), db.models.cluster, callback);
          }
        ], function(err, results){
              console.log('we have inserted everything except nodes');
              async.eachSeries(nodes, function(row, cb){
                createModel(db, row, db.models.nodes, function(){console.log('inserted'); cb()});
              }, function(err){
                console.log('ok '); 
              });
           }
        );
      });
    });
});


/**
 * insert rows in db
 * @param {array} rows
 * @param {Object} model
 * @param {function} cb
 */
function createModels(rows, model, cb){
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

function createModel(db, node, model, cb){
  var nodes = {serial: node.serial, 
               nb_cpu: node.nb_cpu, 
               hostname: node.hostname, 
               disk: node.disk, 
               mem: node.mem
      };
  var extra = {cpu: node.cpu, 
               vendor: node.vendor, 
               owner: node.owner, 
               cluster: node.cluster
           };
   model.create(nodes, function(err, items){
     if (err){
       console.log('Erreur ' + err);
       }
       db.models.vendor.find({name: extra.vendor}).first(function(err, myVendor){
         if(err){console.log("big mistake")}else{console.log("seems ok")};
         items.setVendor(myVendor, function(err){console.log('set vendor'); 
           db.models.cpu.find({name: extra.cpu}).first(function(err, myCpu){
             items.setCpu(myCpu, function(err){console.log('set cpu'); 
               db.models.cluster.find({name: extra.cluster}).first(function(err, myCluster){
                 items.setCluster(myCluster, function(err){console.log('set cluster'); 
                   db.models.owner.find({name: extra.owner}).first(function(err, myOwner){
                     items.setOwner(myOwner, function(err){console.log('set owner'); 
                     cb();
                   });         
                 });    
               });
             });
           });
         });
       });
     });
   });
}



function fixturesCpus(){
  var cpus = [];
  cpus.push({name: 'X5671', nc_core: 2, freq: 2.67});
  cpus.push({name: 'E5-2630', nc_core: 6, freq: 2.3});
  cpus.push({name: 'E5-2620', nc_core: 6, freq: 2});
  cpus.push({name: 'E5-2660', nc_core: 8, freq: 2.2});
  cpus.push({name: 'E5-4640', nc_core: 8, freq: 2.4});
  return cpus;
}

function fixturesVendors(){
  var vendors = [];
  vendors.push({name: 'Dalco AG'});
  vendors.push({name: 'Dell'});
  return vendors;
}

function fixturesClusters(){
  var clusters = [];
  clusters.push({name: 'Baobab'});
  return clusters;
}

function fixturesOwners(){
  var owners = [];
  owners.push({name: 'DPT'});
  owners.push({name: 'CUI'});
  owners.push({name: 'DiSTIC'});
  owners.push({name: 'Wesolowski'});
  return owners;
}

function fixturesNodes(){
  var nodes = [];
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server1', mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-12.12.216'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server2', mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.199'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2620', nb_cpu: 2, disk: 250, hostname: 'login1',  mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.196'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node001', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.101'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node002', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.102'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node003', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.103'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node004', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.104'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node005', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.105'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node006', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.106'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node007', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.107'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node008', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.108'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node009', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.109'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node010', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.110'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node011', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.111'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node012', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.112'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node013', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.113'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node014', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.114'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node015', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.115'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node016', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.116'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node017', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.117'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node018', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.118'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node019', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.119'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node020', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.120'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node021', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.121'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node022', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.122'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.123'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.124'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node025', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.125'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node026', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.126'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node027', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.127'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node028', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.128'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node029', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.129'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node030', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.130'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node031', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.131'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node032', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.132'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node033', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.133'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node034', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.134'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node035', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.135'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node036', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.136'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node037', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.137'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node038', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.138'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node039', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.139'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node040', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.140'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node041', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.141'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node042', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.142'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node043', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.143'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node044', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.144'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node045', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.145'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node046', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.146'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node047', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.147'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node048', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.148'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node049', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.149'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node050', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.150'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node051', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.151'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node052', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.152'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node053', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.153'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node054', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.154'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node055', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.155'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node056', mem: 256, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.156'});
  nodes.push({vendor: 'Dell', cpu: 'E5-4640', nb_cpu: 4, disk: 1000, hostname: 'node057', mem: 512, cluster: 'Baobab', owner: 'Wesolowski', serial: 'dell-lawson-n01'});
  return nodes;
}

