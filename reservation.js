exports.execute = function(execSync){
   //ReservationName=root_11 StartTime=2014-04-29T16:00:00 EndTime=2014-04-29T18:00:00 Duration=02:00:00
   //Nodes=node[01-56] NodeCnt=56 CoreCnt=896 Features=(null) PartitionName=(null) Flags=MAINT,IGNORE_JOBS,SPEC_NODES
   //Users=root Accounts=(null) Licenses=(null) State=INACTIVE

   var out = new Array();
   var result = execSync.exec('scontrol show reservation');
   var reservations = result.stdout.split('\n\n');

   reservations.pop();

   console.log('nb reservations ' + reservations.length);

   for(var i=0; i<reservations.length; i++) {
      var reservation = reservations[i].split(/\s+/);
      out.push(reservation);
   }
     
   return out;
}
