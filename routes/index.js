
/*
 * GET home page.
 */



exports.login = function(req, res) {
   res.render('login', { user: req.user, message: req.flash('error') });
};

exports.index = function(urlRoot) {
  return function(req, res) {
    var user = req.headers['unigechuniqueuid'];
    var email = req.headers['mail'];
    var ismemberof = (req.headers['ismemberof']).split(';');
    var isAdmin = false;
    if (_isAdmin(ismemberof)) {
      isAdmin = true;
    }
    res.render('index',
               { urlRoot: urlRoot, userDetail:
                 {'userName': user,
                  'email': email,
                  'isAdmin': isAdmin},
               title: 'Welcome' });
  };
};

exports.applications = function() {
  return function(req, res) {
    var jsonStruct = {
       cols: {
          group: {
             index: 1,
             type: 'string',
             friendly: 'Group'
          },
          name: {
             index: 2,
             type: 'string',
             friendly: 'Name'
          },
          version: {
             index: 3,
             type: 'string',
             friendly: 'Version'
          },
          module: {
             index: 4,
             type: 'string',
             friendly: 'module'
          },
          link: {
             index: 5,
             type: 'string',
             friendly: 'doc'
          }
       },
       rows: [
       ]
    };
    var data = [
               {group: 'general', name: 'Matlab', module: 'matlab/2012b',
                version: '2012b', link: 'matlab'},

               {group: 'general', name: 'Matlab', module: 'matlab',
                version: '2013b',
                link: 'matlab'},

               {group: 'general', name: 'User mode linux',
                link: 'user-mode-linux'},

               {group: 'general', name: 'Stata', module: 'stata',
                version: '13 mp 16', link: 'stata-13'},

               {group: 'general', name: 'R', module: 'r',
                version: '3.0.1', link: 'r-project-and-r-studio'},

               {group: 'general', name: 'R studio', module: 'rstudio',
                version: '', link: 'r-project-and-r-studio'},

               {group: 'general', name: 'Octave', module: 'octave',
                version: '3.6.4', link: 'octave'},

               {group: 'general', name: 'Gnuplot', version: '',
                link: 'gnuplot'},

               {group: 'general', name: 'Palabos', version: '',
                link: 'palabos'},

               {group: 'general', name: 'GCC', version: '4.7.2',
                link: 'gcc'},

               {group: 'general', name: 'icc', version: '2013', link: 'intel'},
               {group: 'general', name: 'icpc', version: '2013', link: 'intel'},
               {group: 'general', name: 'ifort', version: '2013',
                link: 'intel'},

               {group: 'general', name: 'paraview', module: 'paraview',
                version: '4.10', link: 'paraview'},

               {group: 'general', name: 'Python', module: 'python/27',
                version: '2.7.5', link: 'python'},

               {group: 'python27', name: 'BioPython', version: '1.6.3',
                link: ''},
               {group: 'python27', name: 'Mpi4py', version: '1.3.1',
                link: ''},

               {group: 'general', name: 'Python', module: 'python/33',
                version: '3.3', link: ''},

               {group: 'python33', name: 'BioPython', version: '1.6.3',
                link: ''},

               {group: 'python33', name: 'Mpi4py', version: '1.3.1',
                link: ''},

               {group: 'general', name: 'Gaussian', module: 'Gaussian',
                version: 'g09.c01 with PGI 11.10',
                link: ''},

               {group: 'general', name: 'Boost', version: '1.5.4',
                module: 'boost', link: ''},

               {group: 'python33', name: 'Pygrib', version: '1.9.8',
                link: ''},

               {group: 'python27', name: 'Pygrib', version: '1.9.8',
                link: ''},

               {group: 'general', name: 'MetaPIGA', module: 'MetaPIGA',
                version: '3.1', link: ''},

               {group: 'python27', name: 'Cutadapt', version: '',
                link: ''},

               {group: 'general', name: 'CellProfiler', version: '',
                link: ''},

               {group: 'general', name: 'GIT', version: '3.3',
                link: 'git'},

               {group: 'biani', name: 'MrBayes', module: 'MrBayes',
                version: '3.2.2', link: ''},

               {group: 'biani', name: 'exaML', module: 'exaML',
                version: '1.0.8', link: ''},

               {group: 'biani', name: 'RAxML', module: 'RaxML',
                version: '', link: ''},

               {group: 'biani', name: 'PAML', module: 'paml',
                version: '4.7b', link: ''},

               {group: 'biani', name: 'PhyML', module: 'phyml',
                version: '3.1', link: ''},

               {group: 'biani', name: 'Beast', module: 'beast',
                version: '1.8.0', link: ''},

               {group: 'biani', name: 'Tracer', module: 'tracer',
                version: '1.5', link: ''},

               {group: 'biad', name: 'BWA', module: 'bwa',
                version: '0.7.5a', link: ''},

               {group: 'biad', name: 'samtools', module: 'samtools',
                version: '0.1.19', link: ''},

               {group: 'biad', name: 'bowtie1', module: 'bowtie1',
                version: '1.0.0', link: ''},

               {group: 'biad', name: 'bowtie2', module: 'bowtie2',
                version: '2.1.0', link: ''},

               {group: 'biad', name: 'Tophat', module: 'tophat',
                version: '2.0.9', link: ''},

               {group: 'biad', name: 'Cufflinks', module: 'cufflinks',
                version: '2.1.1', link: ''},

               {group: 'biad', name: 'Trinity', module: 'trinity',
                version: 'r20131110', link: ''},

               {group: 'biad', name: 'Mira assembler', module: 'mira',
                version: '4.0rc4', link: ''}

               ];
    var baseUrl = 'http://baobabmaster.unige.ch/enduser/src/' +
                  'enduser/enduser.html';
    for (var i = 0; i < data.length; i++) {
       if (data[i].link != '') {
         var url = baseUrl + '#' + data[i].link;
         data[i].link = '<a href="' + url + '" target="_blank">doc</a>';
       }
    }
    jsonStruct.rows = data;
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  }
};


exports.allJobsRunning = function(execSync) {
  return function(req, res) {
     var result = execSync.exec(__dirname +
                                '/../scripts/showq.py --json --running');
     var jsonStruct = {
        cols: {
           jobid: {
              index: 1,
              type: 'string',
              friendly: 'Job ID',
              tooltip: 'Click on the id to see your job in ganglia',
              filter: true
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
              type: 'number',
              friendly: 'Max remaining time',
              filter: false
           },
           cpus: {
              index: 6,
              type: 'number',
              friendly: 'Nb cpus',
              filter: true
           },
           nodes: {
              index: 7,
              type: 'string',
              friendly: 'Nodes allocated to the job',
              filter: true
           }
        },
        rows: [
        ]
     };


    var jobs = JSON.parse(result.stdout).running;
    //if no pending jobs, we return just the structure with no data.
    if (typeof jobs == 'undefined') {
       res.render('resjson', { data: JSON.stringify(jsonStruct) });
    }
     var ganglia = require('.././ganglia');
     ganglia.execute(execSync);
     var gangliaLinks = ganglia.parse(execSync);

    for (var i = 0; i < jobs.length; i++) {
      var link = gangliaHosts(jobs[i].jobid);
      var hrefLink = '<a href=\"' +
                     link +
                     '\" target=\"_blank\">' + jobs[i].jobid + '</a>';

      jsonStruct.rows[i] = {jobid: hrefLink,
                            name: _cutJobName(jobs[i].name),
                            user: jobs[i].user,
                            partition: jobs[i].partition,
                            end: jobs[i].end_sec,
                            endFormat: jobs[i].end,
                            cpus: jobs[i].cpus,
                            nodes: jobs[i].nodes};
    }

    res.render('resjson', { data: JSON.stringify(jsonStruct) });

    function gangliaHosts(jobId) {
      for (var i = 0; i < gangliaLinks.length; i++) {
         if (gangliaLinks[i][0] == jobId) {
           return gangliaLinks[i][1];
         }
      }
      return '#';
    }
  };
};
function _cutJobName(str) {
   if (str.length > 20) {
      str = str.substr(0, Math.min(20, str.length)) + '...';
   }
   return str;
}

exports.allJobsPending = function(execSync) {
  return function(req, res) {
    var result = execSync.exec(__dirname +
                               '/../scripts/showq.py --json --pending');
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
              filter: false,
              type: 'number',
              friendly: 'Estimated start time'
           },
           priority: {
              index: 7,
              type: 'number',
              friendly: 'Priority'
           },
           numCpus: {
              index: 8,
              type: 'number',
              friendly: 'Nb cpus'
           }
        },
        rows: [
        ]
     };
    // the id pending doesn't exist if there is no pending jobs.
    var jobs = JSON.parse(result.stdout).pending;
    //if no pending jobs, we return just the structure with no data.
    if (typeof jobs == 'undefined') {
       res.render('resjson', { data: JSON.stringify(jsonStruct) });
       return;
    }
    for (var i = 0; i < jobs.length; i++) {
      jsonStruct.rows[i] = {jobid: jobs[i].jobid,
                            name: _cutJobName(jobs[i].name),
                            user: jobs[i].user,
                            partition: jobs[i].partition,
                            limit: jobs[i].limit,
                            start: jobs[i].start_sec,
                            startFormat: jobs[i].start,
                            priority: jobs[i].priority,
                            numCpus: jobs[i].cpus};
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  };
};


function _isAdmin(ismemberof) {
  for (var i = 0; i < ismemberof.length; i++) {
    if (ismemberof[i] == 'administrator') {
       return true;
    }
  }
  return false;
}

exports.history = function(execSync) {
  return function(req, res) {
      var ouCode = req.headers['unigechemployeeoucode'];
      var user = req.headers['unigechuniqueuid'];
      var ismemberof = (req.headers['ismemberof']).split(';');
      var startDate;

      if (typeof req.query.startDate != 'undefined') {
         startDate = new Date(req.query.startDate);
      }else {
         startDate = new Date(new Date().setDate(new Date().getDate() - 10));
      }

      var history = require('.././history');
      var data = history.execute(execSync, startDate, user);
      var jsonStruct = {
        cols: {
           JobID: {
              index: 1,
              type: 'string',
              friendly: 'Job ID',
              filter: true
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
              filter: true
           },
           Account: {
              index: 4,
              type: 'string',
              friendly: 'Account',
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
              filter: true
           },
           ExitCode: {
              index: 7,
              type: 'string',
              friendly: 'Exit code',
              filter: true
           },
           Start: {
              index: 8,
              type: 'string',
              friendly: 'Start date',
              filter: true
           }
        },
        rows: [
      ]
    };


    for (var i = 0; i < data.length; i++) {
      var j = 0;
      jsonStruct.rows[i] = {JobID: data[i][j++],
                            JobName: data[i][j++],
                            Partition: data[i][j++],
                            Account: data[i][j++],
                            AllocCPUS: data[i][j++],
                            State: data[i][j++],
                            ExitCode: data[i][j++],
                            Start: data[i][j++]
      };
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
   }
};

exports.reservations = function(execSync) {
   return function(req, res) {
      var reservation = require('.././reservation');
      var data = reservation.execute(execSync);
      var jsonStruct = {
        cols: {
           ReservationName: {
              index: 1,
              type: 'string',
              friendly: 'Reservation name',
              filter: true
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
              filter: true
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
              hidden: true
           },
           CoreCnt: {
              index: 7,
              type: 'string',
              friendly: 'Core count',
              filter: false,
              hidden: true
           },
           Features: {
              index: 8,
              type: 'string',
              friendly: 'Features',
              filter: false,
              hidden: true
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
              hidden: true
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
              hidden: true
           },
           Licences: {
              index: 13,
              type: 'string',
              friendly: 'Licences',
              filter: false,
              hidden: true
           },
           State: {
              index: 14,
              type: 'string',
              friendly: 'State',
              filter: false
           }
        },
        rows: [
      ]
    };


    for (var i = 0; i < data.length; i++) {
      var j = 0;
      jsonStruct.rows[i] = {ReservationName: data[i][j++].split('=')[1],
                            StartTime: data[i][j++].split('=')[1],
                            EndTime: data[i][j++].split('=')[1],
                            Duration: data[i][j++].split('=')[1],
                            Nodes: data[i][j++].split('=')[1],
                            NodeCnt: data[i][j++].split('=')[1],
                            CoreCnt: data[i][j++].split('=')[1],
                            Features: data[i][j++].split('=')[1],
                            PartitionName: data[i][j++].split('=')[1],
                            Flags: data[i][j++].split('=')[1],
                            Users: data[i][j++].split('=')[1],
                            Accounts: data[i][j++].split('=')[1],
                            Licences: data[i][j++].split('=')[1],
                            State: data[i][j++].split('=')[1]
      };
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
   }
};


exports.status = function(execSync) {
  return function(req, res) {
    var result = execSync.exec('/usr/bin/sinfo -a --noheader');
    var lines = result.stdout.split('\n');
    lines.pop(); // last element is empty
    var rows = new Array();
    // split each row into an array
    for (var i = 0; i < lines.length; i++) {
      rows[i] = lines[i].split(/\s+/);
    }

    var jsonStruct = {
       cols: {
          partition: {
             index: 1,
             type: 'string',
             friendly: 'Partition'
          },
          avail: {
             index: 2,
             type: 'string',
             friendly: 'Available'
          },
          timelimit: {
             index: 3,
             type: 'string',
             friendly: 'Time limit'
          },
          nodes: {
             index: 4,
             type: 'string',
             friendly: 'Nb nodes'
          },
          state: {
             index: 5,
             type: 'string',
             friendly: 'State'
          },
          nodelist: {
             index: 6,
             type: 'string',
             friendly: 'Node list'
          }
       },
       rows: [
       ]
    };

    for (var i = 0; i < lines.length; i++) {
      jsonStruct.rows[i] = {partition: rows[i][0],
                              avail: rows[i][1],
                              timelimit: rows[i][2],
                              nodes: rows[i][3],
                              state: rows[i][4],
                              nodelist: rows[i][5]};
    }

    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  };
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.userlist = function(db) {
  return function(req, res) {
    var collection = db.get('usercollection');
      collection.find({},{},function(e, docs) {
      res.render('userlist', {
       'userlist' : docs
       });
     });
  };
};
