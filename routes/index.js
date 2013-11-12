
/*
 * GET home page.
 */

exports.login = function(req, res){
   res.render('login', { user: req.user, message: req.flash('error') });
};

exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'Welcome' });
};


exports.ganglia = function(execSync){
   return function(req, res){
      var ganglia = require(".././ganglia");
      ganglia.execute(execSync);
      var data = ganglia.parse(execSync);
   //foreach($res as $job){
   //   print("<a href=\"".$job[1]."\">".$job[0]."</a>\n");
   //   print("</br>\n");
   //}
   //ganglia.
      res.render('status', { data: data});
   }
}

exports.allJobsRunning = function(execSync){
  return function(req, res){
     var ganglia = require(".././ganglia");
     ganglia.execute(execSync);
     var gangliaLinks = ganglia.parse(execSync);

     var result = execSync.exec('/home/falcone/prg/scripts/src/showq.py --json --running');
     var jobs = JSON.parse(result.stdout).running;
     var jsonStruct = {
        cols: {
           jobid: {
              index: 1,
              type: 'string',
              friendly: 'Job ID'
           },
           name: {
              index: 2,
              type: 'string',
              friendly: 'Job name'
           },
           user: {
              index: 3,
              type: 'string',
              friendly: 'User'
           },
           partition: {
              index: 4,
              type: 'string',
              friendly: 'Partition'
           },
           end: {
              index: 5,
              type: 'string',
              friendly: 'Max remaining time'
           },
           nodes: {
              index: 6,
              type: 'string',
              friendly: 'Nodes allocated to the job'
           }
        },
        rows: [
        ]
     };

    function gangliaHosts(jobId){
      for(var i=0; i<gangliaLinks.length; i++){
         if(gangliaLinks[i][0] == jobId){
           return gangliaLinks[i][1];
         }
      }
      return '#';
    }

    for(var i=0; i< jobs.length; i++){
      var link = gangliaHosts(jobs[i].jobid);
      var hrefLink = '<a href=\"' + link + '\">'+ jobs[i].jobid + '</a>';
      
      jsonStruct.rows[i] = {jobid:hrefLink,
                            name:jobs[i].name,
                            user:jobs[i].user,
                            partition:jobs[i].partition,
                            end:jobs[i].end,
                            nodes:jobs[i].nodes};
    }

    res.render('status', { data: JSON.stringify(jsonStruct) });
  };
};

exports.allJobsPending = function(execSync){
  return function(req, res){
    var result = execSync.exec('/home/falcone/prg/scripts/src/showq.py --pending --json');
    var jobs = JSON.parse(result.stdout).pending;
     var jsonStruct = {
        cols: {
           jobid: {
              index: 1,
              type: 'string',
              friendly: 'Job ID'
           },
           name: {
              index: 2,
              type: 'string',
              friendly: 'Job name'
           },
           user: {
              index: 3,
              type: 'string',
              friendly: 'User'
           },
           partition: {
              index: 4,
              type: 'string',
              friendly: 'Partition'
           },
           limit: {
              index: 5,
              type: 'string',
              friendly: 'Requested time'
           },
           start: {
              index: 6,
              type: 'string',
              friendly: 'Estimated start time'
           },
           priority: {
              index: 7,
              type: 'string',
              friendly: 'Priority'
           },
           numNodes: {
              index: 8,
              type: 'string',
              friendly: 'nodes'
           }
        },
        rows: [
        ]
     };
     
    for(var i=0; i< jobs.length; i++){
      jsonStruct.rows[i] = {jobid:jobs[i].jobid,
                            name:jobs[i].name,
                            user:jobs[i].user,
                            partition:jobs[i].partition,
                            limit:jobs[i].limit,
                            start:jobs[i].start,
                            priority:jobs[i].priority,
                            numNodes:jobs[i].numNodes};
    }
    res.render('status', { data: JSON.stringify(jsonStruct) });
  };
};

exports.history = function(execSync){
  return function(req, res){
    var result = execSync.exec("echo titi");
    res.render('resjson', { data: result.stdout });
  };
};

exports.status = function(execSync){
  return function(req, res){
    var result = execSync.exec('/usr/bin/sinfo --noheader');
    var lines = result.stdout.split('\n');
    lines.pop(); // last element is empty
    var rows = new Array();
    // split each row into an array
    for(var i=0; i < lines.length; i++){
      rows[i] = lines[i].split(/\s+/);
    }

    var jsonStruct = {
       cols: {
          partition: {
             index: 1,
             type: 'string'
          },
          avail: {
             index: 2,
             type: 'string'
          },
          timelimit: {
             index: 3,
             type: 'string',
             friendly: 'Time limit'
          },
          nodes: {
             index: 4,
             type: 'string'
          },
          state: {
             index: 5,
             type: 'string'
          },
          nodelist: {
             index: 6,
             type: 'string'
          },
       },
       rows: [
       ]
    };

    for(var i=0; i< lines.length; i++){
      jsonStruct.rows[i] = {partition:rows[i][0],
                              avail:rows[i][1],
                              timelimit:rows[i][2],
                              nodes:rows[i][3],
                              state:rows[i][4],
                              nodelist:rows[i][5]};
    }

    res.render('status', { data: JSON.stringify(jsonStruct) });
  };
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.userlist = function(db) {
  return function(req, res) {
    var collection = db.get('usercollection');
      collection.find({},{},function(e,docs){
      res.render('userlist', {
       "userlist" : docs
       });
     });
  };
};
