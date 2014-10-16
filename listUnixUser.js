/**
 * Yann Sagon ysagon@gmail.com
 */

var users = (function() {
   var async = require('async');
   var passwd = require('etc-passwd');

   var getUnixUser = function(err, user) {
      if (err) {
         console.log(err);
      }else {
         passwd.getUser({'username' : user}, function(user) {
            console.log(JSON.stringify(user));
         });
      }
   };
   /**
    * param: cb (data)
    */
   var getAllUsers = function(cb) {
      return passwd.getUsers(function(err, users) {
            var filteredUsers = Array();
            for (var i = 0; i < users.length; i++) {
               if (users[i].uid > 1000 && users[i].gid == 1000) {
                  filteredUsers.push(users[i]);
               }
            }
            cb(filteredUsers);
      });
      //users.on('user', function(user) {
      //  if(user.uid > 1000 && user.gid == 1000){
      //    console.log(JSON.stringify(user));
      //  }
      //});
      //users.on('end', function() {
      //  console.log('Done.');
      //});
      //return users;
   };

   // ### Public interface

   return {
       getUnixUser: getUnixUser,
       getAllUsers: getAllUsers
   };
}());

module.exports = users;

// Example:
//users.getUnixUser('root');
//users.getAllUsers();
