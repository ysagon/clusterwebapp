/**
 * Extract the reservations
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */

/**
 * Extract the reservations. You'll find below the fields
 * ReservationName
 * StartTime
 * EndTime
 * Duration
 * Nodes
 * NodeCnt
 * CoreCnt
 * Features
 * PartitionName
 * Flags
 * Users
 * Accounts
 * Licenses
 * State
 * @return Array an array for each reservation
 */
exports.execute = function(execSync){
   var out = new Array();
   var result = execSync.exec('scontrol show reservation');
   var reservations = result.stdout.split('\n\n');

   reservations.pop();

   for(var i=0; i<reservations.length; i++) {
      var reservation = reservations[i].split(/\s+/);
      out.push(reservation);
   }
   return out;
}
