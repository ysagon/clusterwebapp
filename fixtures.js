exports.fixturesCpus = function fixturesCpus(){
  var cpus = [];
  cpus.push({name: 'X5671', nc_core: 2, freq: 2.67});
  cpus.push({name: 'E5-2630', nc_core: 6, freq: 2.3});
  cpus.push({name: 'E5-2620', nc_core: 6, freq: 2});
  cpus.push({name: 'E5-2660', nc_core: 8, freq: 2.2});
  cpus.push({name: 'E5-4640', nc_core: 8, freq: 2.4});
  return cpus;
}

exports.fixturesVendors = function fixturesVendors(){
  var vendors = [];
  vendors.push({name: 'Dalco AG'});
  vendors.push({name: 'Dell'});
  return vendors;
}

exports.fixturesClusters = function fixturesClusters(){
  var clusters = [];
  clusters.push({name: 'Baobab'});
  return clusters;
}

exports.fixturesOwners = function fixturesOwners(){
  var owners = [];
  owners.push({name: 'DPT'});
  owners.push({name: 'CUI'});
  owners.push({name: 'DiSTIC'});
  owners.push({name: 'Wesolowski'});
  return owners;
}

exports.fixturesRacks = function fixturesRacks(){
  var racks = [];
  racks.push({name: '161a55'});
  racks.push({name: '161a56'});
  racks.push({name: '161a57'});
  return racks;
}

exports.fixturesChassis = function fixturesChassis(){
  var chassis = [];
  chassis.push({name: 'chassis001', serial: '-', rack: '161a55', base: 1, height: 2});
  chassis.push({name: 'chassis002', serial: '-', rack: '161a55', base: 3, height: 2});
  chassis.push({name: 'chassis003', serial: '-', rack: '161a55', base: 5, height: 2});
  chassis.push({name: 'chassis004', serial: '-', rack: '161a55', base: 7, height: 2});
  chassis.push({name: 'chassis005', serial: '-', rack: '161a55', base: 9, height: 2});
  chassis.push({name: 'chassis006', serial: '-', rack: '161a55', base: 11, height: 2});
  chassis.push({name: 'chassis007', serial: '-', rack: '161a55', base: 13, height: 2});
  chassis.push({name: 'chassis008', serial: '-', rack: '161a55', base: 15, height: 2});
  chassis.push({name: 'chassis009', serial: '-', rack: '161a55', base: 17, height: 2});
  chassis.push({name: 'chassis010', serial: '-', rack: '161a55', base: 19, height: 2});
  chassis.push({name: 'chassis011', serial: '-', rack: '161a55', base: 21, height: 2});
  chassis.push({name: 'chassis012', serial: '-', rack: '161a55', base: 23, height: 2});
  chassis.push({name: 'chassis013', serial: '-', rack: '161a55', base: 25, height: 2});
  chassis.push({name: 'chassis014', serial: '-', rack: '161a55', base: 27, height: 2});
  chassis.push({name: 'chassisNode57', serial: '-', rack: '161a55', base: 27, height: 2});
  chassis.push({name: 'chassisServer1', serial: '-', rack: '161a55', base: 27, height: 2});
  chassis.push({name: 'chassisServer2', serial: '-', rack: '161a55', base: 27, height: 2});
  chassis.push({name: 'chassisLogin1', serial: '-', rack: '161a55', base: 27, height: 1});
  return chassis;
}

exports.fixturesNodes = function fixturesNodes(){
  var nodes = [];
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server1', 
              mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-12.12.216', chassis: 'chassisServer1', height: 2, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2630', nb_cpu: 2, disk: 250, hostname: 'server2', 
              mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.199', chassis: 'chassisServer2', height: 2, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2620', nb_cpu: 2, disk: 250, hostname: 'login1',  
              mem: 32, cluster: 'Baobab', owner: 'DiSTIC', serial: 'S-13.12.196', chassis: 'chassisLogin1', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node001', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.101', chassis: 'chassis001', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node002', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.102', chassis: 'chassis001', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node003', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.103', chassis: 'chassis001', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node004', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.104', chassis: 'chassis001', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node005', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.105', chassis: 'chassis002', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node006', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.106', chassis: 'chassis002', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node007', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.107', chassis: 'chassis002', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node008', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.108', chassis: 'chassis002', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node009', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.109', chassis: 'chassis003', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node010', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.110', chassis: 'chassis003', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node011', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.111', chassis: 'chassis003', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node012', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.112', chassis: 'chassis003', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node013', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.113', chassis: 'chassis004', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node014', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.114', chassis: 'chassis004', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node015', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.115', chassis: 'chassis004', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node016', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.116', chassis: 'chassis004', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node017', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.117', chassis: 'chassis005', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node018', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.118', chassis: 'chassis005', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node019', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.119', chassis: 'chassis005', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node020', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.120', chassis: 'chassis005', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node021', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.121', chassis: 'chassis006', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node022', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.122', chassis: 'chassis006', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.123', chassis: 'chassis006', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node023', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.124', chassis: 'chassis006', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node025', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.125', chassis: 'chassis007', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node026', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.126', chassis: 'chassis007', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node027', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.127', chassis: 'chassis007', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node028', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.128', chassis: 'chassis007', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node029', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.129', chassis: 'chassis008', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node030', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.130', chassis: 'chassis008', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node031', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.131', chassis: 'chassis008', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node032', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.132', chassis: 'chassis008', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node033', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.133', chassis: 'chassis009', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node034', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.134', chassis: 'chassis009', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node035', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.135', chassis: 'chassis009', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node036', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.136', chassis: 'chassis009', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node037', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.137', chassis: 'chassis010', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node038', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.138', chassis: 'chassis010', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node039', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.139', chassis: 'chassis010', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node040', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.140', chassis: 'chassis010', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node041', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.141', chassis: 'chassis011', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node042', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.142', chassis: 'chassis011', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node043', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.143', chassis: 'chassis011', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node044', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.144', chassis: 'chassis011', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node045', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.145', chassis: 'chassis012', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node046', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.146', chassis: 'chassis012', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node047', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.147', chassis: 'chassis012', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node048', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.148', chassis: 'chassis012', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node049', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.149', chassis: 'chassis013', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node050', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.150', chassis: 'chassis013', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node051', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.151', chassis: 'chassis013', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node052', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.152', chassis: 'chassis013', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node053', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.153', chassis: 'chassis014', height: 1, horizontal: 'right', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node054', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.154', chassis: 'chassis014', height: 1, horizontal: 'left', vertical: 'bottom'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node055', 
              mem: 64, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.155', chassis: 'chassis014', height: 1, horizontal: 'right', vertical: 'top'});
  nodes.push({vendor: 'Dalco AG', cpu: 'E5-2660', nb_cpu: 2, disk: 250, hostname: 'node056', 
              mem: 256, cluster: 'Baobab', owner: 'DiSTIC', serial: 'N-12.12.156', chassis: 'chassis014', height: 1, horizontal: 'left', vertical: 'top'});
  nodes.push({vendor: 'Dell', cpu: 'E5-4640', nb_cpu: 4, disk: 1000, hostname: 'node057', 
              mem: 512, cluster: 'Baobab', owner: 'Wesolowski', serial: 'dell-lawson-n01', chassis: 'chassisNode57', height: 2, horizontal: 'left', vertical: 'bottom'});
  return nodes;
}

