exports.execute = function(execSync, startDate, user){
   var out = new Array();
   var formatDate = startDate.getFullYear() + '-' + String(Number(startDate.getMonth())+1) + '-' + startDate.getDate();


   var format = 'JobID,JobName,Partition,Account,AllocCPUS,State,ExitCode,Start';

   var cmd = 'sacct --user ' + user + ' -s CA,CD,F,NF,PR,TO -S ' + formatDate + ' --parsable2 --noheader --format ' + format;
   console.log(cmd);
   var result = execSync.exec(cmd);

   var jobs = result.stdout.split('\n');

   jobs.pop();

   console.log('nb history ' + jobs.length);

   for(var i=0; i<jobs.length; i++) {
      var job = jobs[i].split('|');
      out.push(job);
   }
     
   return out;
}
