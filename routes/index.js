
/*
 * GET home page.
 */



exports.login = function(req, res){
   res.render('login', { user: req.user, message: req.flash('error') });
};

exports.index = function(urlRoot){
  return function(req, res){
    var user = req.headers['unigechuniqueuid'];
    var email = req.headers['mail'];
    var ismemberof = (req.headers['ismemberof']).split(";");
    var isAdmin = false;
    if (_isAdmin(ismemberof)){
      isAdmin = true;
    }
    res.render('index', { urlRoot: urlRoot, userDetail: {'userName': user, 'email': email, 'isAdmin': isAdmin}, title: 'Welcome' });
  };
}

exports.allJobsRunning = function(execSync){
  return function(req, res){
     var ganglia = require(".././ganglia");
     ganglia.execute(execSync);
     var gangliaLinks = ganglia.parse(execSync);

     var result = execSync.exec(__dirname + '/../scripts/showq.py --json --running');
     var jobs = JSON.parse(result.stdout).running;
     var jsonStruct = {
        cols: {
           jobid: {
              index: 1,
              type: 'string',
              friendly: 'Job ID',
              tooltip: 'Click on the id to see your job in ganglia',
              filter: true,
           },
           name: {
              index: 2,
              type: 'string',
              filter: true,
              friendly: 'Job name'
           },
           user: {
              index: 3,
              type: 'string',
              friendly: 'User',
              filter: true,
              tooltip: 'Owner of the job'
           },
           partition: {
              index: 4,
              type: 'string',
              friendly: 'Partition',
              filter: true
           },
           end: {
              index: 5,
              type: 'string',
              friendly: 'Max remaining time',
              filter: false
           },
           nodes: {
              index: 6,
              type: 'number',
              friendly: 'Nodes allocated to the job',
              filter: true
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

    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  };
};

exports.allJobsPending = function(execSync){
  return function(req, res){
    var result = execSync.exec(__dirname + '/../scripts/showq.py --json --pending');
    // the id pending doesn't exist if there is no pending jobs.
    var jobs = JSON.parse(result.stdout).pending;
    if (typeof jobs == 'undefined'){
      res.render('resjson',{});
      return;
    }
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
              type: 'number',
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
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  };
};


function _isAdmin(ismemberof){
  for(var i=0; i<ismemberof.length; i++){
    if(ismemberof[i]=='administrateur'){
       return true;
    }
  }
  return false;
}

exports.history = function(execSync){
  return function(req, res){
      var ouCode = req.headers['unigechemployeeoucode'];
      var user = req.headers['unigechuniqueuid'];
      var ismemberof = (req.headers['ismemberof']).split(";");
      var startDate;

      if(typeof req.query.startDate != 'undefined'){
         startDate = new Date(req.query.startDate);
      }else{
         startDate  = new Date(new Date().setDate(new Date().getDate()-10));
      }

      var history = require(".././history");
      var data = history.execute(execSync, startDate, user);
      var jsonStruct = {
        cols: {
           JobID: {
              index: 1,
              type: 'string',
              friendly: 'Job ID',
              filter: true,
           },
           JobName: {
              index: 2,
              type: 'string',
              filter: true,
              friendly: 'Job name'
           },
           Partition: {
              index: 3,
              type: 'string',
              friendly: 'Partition',
              filter: true,
           },
           Account: {
              index: 4,
              type: 'string',
              friendly: 'account',
              filter: true
           },
           AllocCPUS: {
              index: 5,
              type: 'number',
              friendly: 'Cpus allocated',
              filter: true
           },
           State: {
              index: 6,
              type: 'string',
              friendly: 'State',
              filter: true,
           },
           ExitCode: {
              index: 7,
              type: 'string',
              friendly: 'Exit code',
              filter: true,
           },
           Start: {
              index: 8,
              type: 'string',
              friendly: 'Start date',
              filter: true,
           },
        },
        rows: [
      ],
    };
     

    for(var i=0; i< data.length; i++){
      var j = 0;
      jsonStruct.rows[i] = {JobID:data[i][j++],
                            JobName:data[i][j++],
                            Partition:data[i][j++],
                            Account:data[i][j++],
                            AllocCPUS:data[i][j++],
                            State:data[i][j++],
                            ExitCode:data[i][j++],
                            Start:data[i][j++]
      };
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
   }
}

exports.reservations = function(execSync){
   return function(req, res){
      var reservation = require(".././reservation");
      var data = reservation.execute(execSync);
      var jsonStruct = {
        cols: {
           ReservationName: {
              index: 1,
              type: 'string',
              friendly: 'Reservation name',
              filter: true,
           },
           StartTime: {
              index: 2,
              type: 'string',
              filter: true,
              friendly: 'Start time'
           },
           EndTime: {
              index: 3,
              type: 'string',
              friendly: 'End time',
              filter: true,
           },
           Duration: {
              index: 4,
              type: 'string',
              friendly: 'Duration',
              filter: true
           },
           Nodes: {
              index: 5,
              type: 'string',
              friendly: 'Nodes',
              filter: false
           },
           NodeCnt: {
              index: 6,
              type: 'string',
              friendly: 'Node count',
              filter: false,
              hidden: true,
           },
           CoreCnt: {
              index: 7,
              type: 'string',
              friendly: 'Core count',
              filter: false,
              hidden: true,
           },
           Features: {
              index: 8,
              type: 'string',
              friendly: 'Features',
              filter: false,
              hidden: true,
           },
           PartitionName: {
              index: 9,
              type: 'string',
              friendly: 'Partition name',
              filter: false
           },
           Flags: {
              index: 10,
              type: 'string',
              friendly: 'Flags',
              filter: false,
              hidden: true,
           },
           Users: {
              index: 11,
              type: 'string',
              friendly: 'Users',
              tooltip: 'users permited to use the reserved ressources',
              filter: false
           },
           Accounts: {
              index: 12,
              type: 'string',
              friendly: 'Accounts',
              filter: false,
              hidden: true,
           },
           Licences: {
              index: 13,
              type: 'string',
              friendly: 'Licences',
              filter: false,
              hidden: true,
           },
           State: {
              index: 14,
              type: 'string',
              friendly: 'State',
              filter: false
           }
        },
        rows: [
      ],
    };
     

    for(var i=0; i< data.length; i++){
      var j = 0;
      jsonStruct.rows[i] = {ReservationName:data[i][j++].split('=')[1],
                            StartTime:data[i][j++].split('=')[1],
                            EndTime:data[i][j++].split('=')[1],
                            Duration:data[i][j++].split('=')[1],
                            Nodes:data[i][j++].split('=')[1],
                            NodeCnt:data[i][j++].split('=')[1],
                            CoreCnt:data[i][j++].split('=')[1],
                            Features:data[i][j++].split('=')[1],
                            PartitionName:data[i][j++].split('=')[1],
                            Flags:data[i][j++].split('=')[1],
                            Users:data[i][j++].split('=')[1],
                            Accounts:data[i][j++].split('=')[1],
                            Licences:data[i][j++].split('=')[1],
                            State:data[i][j++].split('=')[1]
      };
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
   }
}


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

    res.render('resjson', { data: JSON.stringify(jsonStruct) });
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
