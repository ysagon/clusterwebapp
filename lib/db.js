var orm = require('orm');
var async = require('async');
var fixtures = require('./fixtures.js');


//createAndPopulateDb();

fetchNodes();

function fetchNodes() {
  initDb(function(db) {
    db.models.nodes.find({'hostname': orm.like('node%')}, function(err, nodes) {
      console.log(err);
      for (i = 0; i < 10; i++) {
        var node = nodes[i];
        async.parallel({
          vendor: node.getVendor,
          chassis: node.getChassis
        }, function(err, results) {
          console.log('vendor: ', results.vendor.name,
                      'chassis: ', results.chassis.name);
        });
      }
    });
  });
}


function initDb(cb) {
  orm.connect('sqlite:inventory.db', function(err, db) {
    if (err) return console.error('Connection error: ' + err);
    db.load('./models.js', function(err) {
      if (err) return console.error('load models error: ' + err);
      cb(db);
    });
  });
}

function createAndPopulateDb() {
  initDb(populateDb);
}

function populateDb(db) {
  db.sync(function() {
    async.parallel([
      function(callback) {
        createModels(fixtures.fixturesVendors(), db.models.vendor, callback);
      },
      function(callback) {
        createModels(fixtures.fixturesCpus(), db.models.cpu, callback);
      },
      function(callback) {
        createModels(fixtures.fixturesOwners(), db.models.owner, callback);
      },
      function(callback) {
        createModels(fixtures.fixturesClusters(), db.models.cluster, callback);
      },
      function(callback) {
        createModels(fixtures.fixturesRacks(), db.models.rack, callback);
      }
    ], function(err, results) {
      async.series([
        function(cbg) {
          async.eachSeries(fixtures.fixturesChassis(), function(row, cb) {
            insertChassis(db, row, function() {
              console.log('chassis inserted'); cb();
            });
          }, function(err) {
            console.log('all chassis inserted ');
            cbg();
          });
        },
        function(cbg) {
          async.eachSeries(fixtures.fixturesNodes(), function(row, cb) {
            insertNodes(db, row, function() {
              console.log('node inserted'); cb();
            });
          }, function(err) {
            console.log('all nodes inserted ');
            cbg();
          });
        }
      ]);
    }
    );
  });
}


/**
 * insert rows in db
 * @param {array} rows
 * @param {Object} model
 * @param {function} cb
 */
function createModels(rows, model, cb) {
  async.each(rows, function(row, callback) {
    model.create(row, function(err, items) {
      if (err) {
        console.log('Erreur ' + err);
      }
      callback();
    });
  }, function(err) {
    console.log('insertion done');
    cb();
  });
}

function insertNodes(db, data, cb) {
  async.parallel({
    vendor: function(callback) {
      db.models.vendor.find({name: data.vendor}).first(callback);
    },
    cpu: function(callback) {
      db.models.cpu.find({name: data.cpu}).first(callback);
    },
    cluster: function(callback) {
      db.models.cluster.find({name: data.cluster}).first(callback);
    },
    owner: function(callback) {
      db.models.owner.find({name: data.owner}).first(callback);
    },
    chassis: function(callback) {
      db.models.chassis.find({name: data.chassis}).first(callback);
    }
  }, function(err, results) {
    data.cpu = results.cpu;
    data.vendor = results.vendor;
    data.cluster = results.cluster;
    data.owner = results.owner;
    data.chassis = results.chassis;
    db.models.nodes.create(data, cb);
  });
}

function insertChassis(db, data, cb) {
  async.parallel({
    rack: function(callback) {
      db.models.rack.find({name: data.rack}).first(callback);
    }
  }, function(err, results) {
    db.models.chassis.create({
      name: data.name,
      serial: data.serial,
      rack: results.rack
    }, cb);
  });
}

