/**
 * @author Yann.Sagon@unige.ch
 */

module.exports = function(db, cb){
   db.define('vendor', {
     id   : {type: 'serial', key: true},
     name : {type: 'text'}
   });

   db.define('cpu', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'},
     nb_core : {type: 'integer'},
     freq    : {type: 'number'}
   });

   db.define('cluster', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'}
   });

   db.define('owner', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'}
   });

   db.define('nodes', {
     id       : {type: 'serial', key: true},
     serial   : {type: 'text'},
     hostname : {type: 'text'},
     nb_cpu   : {type: 'integer'},
     mem      : {type: 'integer'}
   });

   db.models.nodes.hasOne('vendor', db.models.vendor);
   db.models.nodes.hasOne('cpu', db.models.cpu);
   db.models.nodes.hasOne('cluster', db.models.cluster);
   db.models.nodes.hasOne('owner', db.models.owner);

   return cb();

};
