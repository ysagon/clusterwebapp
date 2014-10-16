var unixUsers = require('./listUnixUser.js');
var ldapUsers = require('./listuser.js');

//

var cb = function(unixUsers) {
   ldapUsers.execute(function(ldapUsers) {
   //{ displayName: 'Jean-Luc Falcone',
   //  unigeChUniqueUid: 'falcone',
   //  unigechemployeeuid: 'falcone' }
   //
   //{ username: 'barbieb0',
   // password: 'x',
   // uid: 200269,
   // gid: 1000,
   // comments: 'BARBIERI Bruno',
   // home: '/home/barbieb0',
   // shell: '/bin/bash' },
   //
   //   console.log(bla);
     var unix = normalizeUnix(unixUsers);
     var res = diffUsers(unix, ldapUsers);
     console.log(res);
      //console.log(data);
   });
   //console.log(JSON.stringify(data));
   //console.log(data);
};

var normalizeUnix = function(data) {
   var res = new Array();
   for (var i = 0; i < data.length; i++) {
      res.push({ displayName: data[i].comments,
                 unigeChUniqueUid: data[i].username });
   }
   return res;
};

var diffUsers = function(set1, set2) {
   var notInSet2 = new Array();
   for (var i = 0; i < set1.length; i++) {
      var match = false;
      for (var j = 0; j < set2.length; j++) {
         if (set2[j].unigeChUniqueUid == set1[i].unigeChUniqueUid) {
            match = true;
         }
      }
      if (!match) {
         notInSet2.push(set1[i]);
      }
   }
   return notInSet2;
};



users = unixUsers.getAllUsers(cb);





