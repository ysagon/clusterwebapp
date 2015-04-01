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

   db.define('chassis', {
     id      : {type: 'serial', key: true},
     name    : {type: 'text'},
     serial  : {type: 'text'},
     height  : {type: 'integer'},
     base    : {type: 'integer'}
   });

   db.define('nodes', {
     id         : {type: 'serial', key: true},
     serial     : {type: 'text'},
     hostname   : {type: 'text'},
     nb_cpu     : {type: 'integer'},
     mem        : {type: 'integer'},
     disk       : {type: 'integer'},
     height     : {type: 'integer'},
     horizontal : {type: 'enum', required: false, values: ['left', 'right']},
     vertical   : {type: 'enum', required: false, values: ['top', 'bottom']}
   });


   db.define('rack', {
     id   : {type: 'serial', key: true},
     name : {type: 'text'}  
   });
  
   db.models.nodes.hasOne('vendor', db.models.vendor, {autoFetch: true });
   db.models.nodes.hasOne('cpu', db.models.cpu);
   db.models.nodes.hasOne('cluster', db.models.cluster);
   db.models.nodes.hasOne('owner', db.models.owner, {reverse: "nodes"} );
   db.models.nodes.hasOne('chassis', db.models.chassis, {required: false});

   db.models.chassis.hasOne('rack', db.models.rack);
   return cb();

};
