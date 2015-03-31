var orm = require('orm');
var async = require('async');

orm.connect('sqlite:inventory.db', function(err, db){
   //db.settings.set('instance.cache', false);
   if(err) return console.error('Connection error: ' + err);
   db.load("./models.js", function(err){
      if(err) return console.error('load models error: ' + err);

      //var nodes = fixturesNodes();
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
          },
          function(callback){
            createModels(fixturesRacks(), db.models.rack, callback);
          }
        ], function(err, results){
             async.series([
               function(cbg){
                 async.eachSeries(fixturesChassis(), function(row, cb){
                   insertChassis(db, row, function(){console.log('inserted'); cb()});
                 }, function(err){
                   console.log('ok ');
                   cbg();
                 });
               },
               function(cbg){
                 async.eachSeries(fixturesNodes(), function(row, cb){
                   insertNodes(db, row, function(){console.log('inserted'); cb()});
                 }, function(err){
                   console.log('ok ');
                   cbg();
                 });
               }
             ]);
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

function insertNodes(db, data, cb){
   async.parallel({
     vendor: function(callback){
       db.models.vendor.find({name: data.vendor}).first(callback);
     },
     cpu: function(callback){
       db.models.cpu.find({name: data.cpu}).first(callback);
     },
     cluster: function(callback){
       db.models.cluster.find({name: data.cluster}).first(callback);
     },
     owner: function(callback){
       db.models.owner.find({name: data.owner}).first(callback);
     },
     chassis: function(callback){
       db.models.chassis.find({name: data.chassis}).first(callback);
     }
   }, function(err, results){
     data.cpu = results.cpu;
     data.vendor = results.vendor;
     data.cluster = results.cluster;
     data.owner = results.owner;
     data.chassis = results.chassis;
     db.models.nodes.create(data, cb);
   });
}

function insertChassis(db, data, cb){
   async.parallel({
     rack: function(callback){
             db.models.rack.find({name: data.rack}).first(callback);
           }
   }, function(err, results){
     db.models.chassis.create({
       name: data.name, 
       serial: data.serial, 
       rack: results.rack
     }, cb);
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

function fixturesRacks(){
  var racks = [];
  racks.push({name: '161a55'});
  racks.push({name: '161a56'});
  racks.push({name: '161a57'});
  return racks;
}

function fixturesChassis(){
  var chassis = [];
  chassis.push({name: 'chassis001', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis002', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis003', serial: '-', rack: '161a56', height: 4});
  chassis.push({name: 'chassis004', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis005', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis006', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis007', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis008', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis009', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis010', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis011', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis012', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis013', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis014', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis015', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis016', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis017', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis018', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis019', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis020', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis021', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis021', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis023', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis024', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis025', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis026', serial: '-', rack: '161a55', height: 4});
  chassis.push({name: 'chassis027', serial: '-', rack: '161a55', height: 4});
  return chassis;
}

function fixturesNodes(){
  var nodes = [];
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server1', mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-12.12.216', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server2', mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.199', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2620', nb_cpu: 2, disk: 250, hostname: 'login1',  mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.196', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node001', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.101', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node002', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.102', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node003', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.103', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node004', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.104', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node005', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.105', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node006', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.106', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node007', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.107', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node008', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.108', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node009', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.109', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node010', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.110', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node011', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.111', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node012', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.112', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node013', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.113', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node014', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.114', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node015', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.115', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node016', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.116', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node017', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.117', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node018', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.118', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node019', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.119', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node020', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.120', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node021', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.121', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node022', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.122', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.123', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.124', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node025', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.125', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node026', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.126', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node027', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.127', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node028', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.128', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node029', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.129', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node030', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.130', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node031', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.131', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node032', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.132', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node033', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.133', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node034', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.134', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node035', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.135', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node036', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.136', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node037', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.137', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node038', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.138', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node039', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.139', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node040', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.140', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node041', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.141', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node042', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.142', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node043', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.143', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node044', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.144', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node045', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.145', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node046', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.146', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node047', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.147', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node048', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.148', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node049', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.149', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node050', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.150', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node051', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.151', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node052', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.152', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node053', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.153', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node054', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.154', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node055', mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.155', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node056', mem: 256, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.156', chassis: 'chassis019', position: 'left'});
  nodes.push({vendor: 'Dell', cpu: 'E5-4640', nb_cpu: 4, disk: 1000, hostname: 'node057', mem: 512, cluster: 'Baobab', owner: 'Wesolowski', serial: 'dell-lawson-n01', chassis: 'chassis019', position: 'left'});
  return nodes;
}

