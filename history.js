/**
 * Extracts the jobs history of a given user
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */

/**
 * Use sacct to extract informations about the terminated jobs of a user
 * @param {date} startDate the begining of the history
 * @param {string} user the user we want to work with
 * @return {array} An array, one element per job
 */
exports.execute = function(startDate, user) {
   var out = new Array();

   var fullYear = startDate.getFullYear();
   var month = Number(startDate.getMonth()) + 1;
   var day = startDate.getDate();

   // not possible to format correctly the Date object.. pff
   if (month.toString().length == 1) {
     month = '0' + month;
   }

   if (day.toString().length == 1) {
     day = '0' + day;
   }

   var formatDate = fullYear + '-' + month + '-' + day;

   var format = 'JobID,JobName,Partition,Account,' +
                'AllocCPUS,State,ExitCode,Start,End,Elapsed,timelimit';

   var cmd = 'sacct --user ' +
             user +
             ' -s CA,CD,F,NF,PR,TO -S ' +
             formatDate +
             ' --parsable2 --noheader --format ' +
             format;
   var result = require('child_process').execSync(cmd);

   var jobs = result.stdout.split('\n');

   jobs.pop();

   for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i].split('|');
      out.push(job);
   }
   return out;
};
