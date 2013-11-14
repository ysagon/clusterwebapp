exports.execute = function(execSync){
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
