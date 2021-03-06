
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
    var isAdmin = false;
    if (_isAdmin(req)) {
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
          sortOrder: 'asc',
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

      {group: 'general', name: 'GNU parallel', module: 'parallel',
        version: '20140322', link: ''},

      {group: 'general', name: 'Stata', module: 'stata',
        version: '13 mp 16', link: 'stata-13'},

      {group: 'general', name: 'R', module: 'r',
        version: '3.1.1', link: 'r-project-and-r-studio'},

      {group: 'general', name: 'PETSc', module: 'petsc',
        version: '3.4.4', link: ''},

      {group: 'general', name: 'R with MKL BLAS',
        module: 'r/311-parallel', version: '3.1.1',
        link: 'r-project-and-r-studio'},

      {group: 'general', name: 'R studio', module: 'rstudio',
        version: '', link: 'r-project-and-r-studio'},

      {group: 'general', name: 'Octave', module: 'octave',
        version: '3.6.4', link: 'octave'},

      {group: 'general', name: 'Gnuplot', version: '',
        link: 'gnuplot'},

      {group: 'general', name: 'Palabos', version: '',
        link: 'palabos'},

      {group: 'tools', name: 'cmake', module: 'cmake',
        version: '3.0.0', link: ''},

      {group: 'compiler', name: 'openMPI gcc',
        module: 'openmpi/gcc/', version: '1.8.3', link: ''},

      {group: 'compiler', name: 'openMPI intel',
        module: 'openmpi/intel/', version: '1.8.3', link: ''},

      {group: 'compiler', name: 'GCC', version: '4.8.2',
        link: 'gcc'},

      {group: 'compiler', name: 'icc', version: '2015',
        link: 'intel'},

      {group: 'compiler', name: 'icpc', version: '2015',
        link: 'intel'},

      {group: 'compiler', name: 'ifort', version: '2015',
        link: 'intel'},

      {group: 'compiler', name: 'PGI', module: 'pgi/1310',
        version: '13.10', link: ''},

      {group: 'compiler', name: 'PGI', module: 'pgi/1110',
        version: '11.10', link: ''},

      {group: 'tools', name: 'paraview', module: 'paraview',
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

      {group: 'general', name: 'Gaussian', module: 'gaussian',
        version: 'g09.c01 with PGI 11.10', link: ''},

      {group: 'general', name: 'Boost', version: '1.5.6',
        module: 'boost', link: ''},

      {group: 'python33', name: 'Pygrib', version: '1.9.8',
        link: ''},

      {group: 'python27', name: 'Pygrib', version: '1.9.8',
        link: ''},

      {group: 'python27', name: 'pp', version: '1.6.4',
        link: ''},

      {group: 'python27', name: 'Cutadapt', version: '',
        link: ''},

      {group: 'general', name: 'xsd', module: 'xsd',
        version: '3.3.0', link: ''},

      {group: 'general', name: 'java', module: 'java',
        version: '1.7.0.55', link: ''},

      {group: 'general', name: 'MetaPIGA', module: 'metapiga',
        version: '3.1', link: ''},

      {group: 'general', name: 'CellProfiler', version: '',
        link: ''},

      {group: 'general', name: 'cpmd', module: 'cpmd',
        version: '3.17.1', link: ''},

      {group: 'general', name: 'ADF', module: 'adf',
        version: '2013.01d', link: ''},

      {group: 'general', name: 'GIT', version: '3.3',
        link: 'git'},

      {group: 'general', name: 'fall3d', module: 'fall3d',
        version: '7.0', link: ''},

      {group: 'general', name: 'fastx toolkit', module: 'fastx_tookit',
        version: '0.0.14', link: ''},

      {group: 'general', name: 'fftw3', module: 'fftw3',
        version: '3.3.4', link: ''},

      {group: 'general', name: 'fsl', module: 'fsl',
        version: '507', link: ''},

      {group: 'general', name: 'MrBayes', module: 'mrbayes',
        version: '3.2.2', link: ''},

      {group: 'general', name: 'MEME', module: 'meme',
        version: '4.10', link: ''},

      {group: 'general', name: 'exaML', module: 'examl',
        version: '1.0.8', link: ''},

      {group: 'general', name: 'exabayes', module: 'exabayes',
        version: '1.4.1', link: ''},

      {group: 'general', name: 'RAxML', module: 'raxml',
        version: '8.0.26', link: ''},

      {group: 'general', name: 'PAML', module: 'paml',
        version: '4.7b', link: ''},

      {group: 'general', name: 'PhyML', module: 'phyml',
        version: '3.1', link: ''},

      {group: 'general', name: 'Beast', module: 'beast',
        version: '1.8.0', link: ''},

      {group: 'general', name: 'Tracer', module: 'tracer',
        version: '1.5', link: ''},

      {group: 'general', name: 'BWA', module: 'bwa',
        version: '0.7.5a', link: ''},

      {group: 'general', name: 'cd-hit', module: 'cd-hit',
        version: '4.6.1-2012-08-27', link: ''},

      {group: 'general', name: 'cd-hit-cluster-consensus',
        module: 'cdhit-cluster-consensus', version: '2013-03-27',
        link: ''},

      {group: 'general', name: 'samtools', module: 'samtools',
        version: '0.1.19', link: ''},

      {group: 'general', name: 'bowtie1', module: 'bowtie1',
        version: '1.0.0', link: ''},

      {group: 'general', name: 'bowtie2', module: 'bowtie2',
        version: '2.1.0', link: ''},

      {group: 'general', name: 'Tophat', module: 'tophat',
        version: '2.0.9', link: ''},

      {group: 'general', name: 'Cufflinks', module: 'cufflinks',
        version: '2.1.1', link: ''},

      {group: 'general', name: 'Gromacs', module: 'gromacs',
        version: '4.6.5', link: ''},

      {group: 'general', name: 'hmmer', module: 'hmmer',
        version: '3.1b1', link: ''},

      {group: 'general', name: 'Trinity', module: 'trinity',
        version: '20140717', link: ''},

      {group: 'general', name: 'Mira assembler', module: 'mira',
        version: '4.0rc4', link: ''}

    ];
    var baseUrl = 'http://baobabmaster.unige.ch/enduser/src/' +
                  'enduser/enduser.html';
    for (var i = 0; i < data.length; i++) {
      if (data[i].link != '') {
        var url = baseUrl + '#' + data[i].link;
        data[i].link = '<a href="' + url + '" target="_blank">doc</a>';
      }
      if (typeof data[i].module != 'undefined') {
        data[i].module = '<a href="' + 'http://baobabmaster.unige.ch' +
            '/enduser/src/enduser/enduser.html#modules' +
            '" target="_blank">' + data[i].module + '</a>';
      }
    }
    jsonStruct.rows = data;
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  }
};


exports.allJobsRunning = function() {
  return function(req, res) {
    var data = myCache.get('runningJobs');
    if (Object.keys(data).length === 0) {
      console.log('not in cache!');
      var result;
      try {
        result = require('child_process').execSync(__dirname +
            '/../scripts/showq.py --json --running', { encoding: 'utf-8'});
      }catch (err) {
        console.log("Error: ", err);
        console.log('Error: all running jobs');
        return;
      }
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

      //var jobs = JSON.parse(result.stdout).running;
      var jobs = JSON.parse(result).running;
      //if no pending jobs, we return just the structure with no data.
      if (typeof jobs == 'undefined') {
        res.render('resjson', { data: JSON.stringify(jsonStruct) });
      }
      var ganglia = require('.././ganglia');
      ganglia.execute();
      var gangliaLinks = ganglia.parse();

      for (var i = 0; i < len(jobs); i++) {
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
      var data = JSON.stringify(jsonStruct);
      function len(x) {
        if (x) return Object.keys(x).length;
        else return -1;
      }

      function gangliaHosts(jobId) {
        for (var i = 0; i < gangliaLinks.length; i++) {
          if (gangliaLinks[i][0] == jobId) {
            return gangliaLinks[i][1];
          }
        }
        return '#';
      }
      myCache.set('runningJobs', data);
    }else {
      data = data.runningJobs;
      console.log('in cache!');
    }
    res.render('resjson', { data: data });

  };
};
function _cutJobName(str) {
  if (str.length > 20) {
    str = str.substr(0, Math.min(20, str.length)) + '...';
  }
  return str;
}

exports.allJobsPending = function() {
  return function(req, res) {
    var result = require('child_process').execSync(__dirname +
        '/../scripts/showq.py --json --pending', { encoding: 'utf-8'});
    var slurm = require('../slurm.js');
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
          type: 'number',
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
        },
        hint: {
          index: 9,
          type: 'string',
          friendly: 'Hint'
        }
      },
      rows: [
      ]
    };
    // the id pending doesn't exist if there is no pending jobs.
    var jobs = JSON.parse(result).pending;
    //var jobs = JSON.parse(result.stdout).pending;
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
        limit: slurm.convertSlurmDateToSec(jobs[i].limit),
        limitFormat: jobs[i].limit,
        start: jobs[i].start_sec,
        startFormat: jobs[i].start,
        priority: jobs[i].priority,
        numCpus: jobs[i].cpus};
      // if the requested time is less or equal than 12 hours
      // and the requested partition is parallel,
      // we give the advice to use the shared partition.
      if (jsonStruct.rows[i] &&
          jsonStruct.rows[i].limit <= (3600 * 12) &&
          jsonStruct.rows[i].partition == 'parallel') {
        console.log('time: ' + jsonStruct.rows[i].limit);
        jsonStruct.rows[i].hint = '<a data-toggle="tooltip" ' +
            'class="tooltipLink" ' +
            'data-original-title="You should probably use the shared ' +
            'partition for this job to be scheduled faster">' +
            '<span class="glyphicon glyphicon-info-sign"></span>a</a>';
      }
      //else {
      //  jsonStruct.rows[i].hint = '<span class="glyphicon ' +
      //                            ' glyphicon-info-sign">' +
      //                            '</span>';
      //}
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  };
};


function _isAdmin(req) {
  var ismemberof = (req.headers['ismemberof']);
  if (typeof ismemberof !== 'undefined') {
    ismemberof = ismemberof.split(';');
    for (var i = 0; i < ismemberof.length; i++) {
      if (ismemberof[i] == 'administrator') {
        return true;
      }
    }
  }
  return false;
}

exports.listUsers = function() {
  return function(req, res) {
    var listUsers = require('.././listuser');
    var data = listUsers.execute(function(data) {
      res.render('resjson', {data: JSON.stringify(data)});
    });
  };
};

exports.history = function() {
  return function(req, res) {
    var slurm = require('../slurm.js');
    var ouCode = req.headers['unigechemployeeoucode'];
    var user = req.headers['unigechuniqueuid'];
    var startDate;

    if (typeof req.query.startDate != 'undefined') {
      startDate = new Date(req.query.startDate);
    }else {
      startDate = new Date(new Date().setDate(new Date().getDate() - 10));
    }

    if (_isAdmin(req)) {
      if (typeof req.query.user != 'undefined' && req.query.user != '') {
        user = req.query.user;
      }
    }

    var history = require('.././history');
    var data = history.execute(startDate, user);
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
          hidden: true,
          friendly: 'Account',
          filter: true
        },
        AllocCPUS: {
          index: 5,
          type: 'number',
          friendly: 'Cpus allocated',
          hidden: true,
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
        },
        End: {
          index: 9,
          type: 'string',
          friendly: 'End date',
          hidden: true,
          filter: true
        },
        Elapsed: {
          index: 10,
          type: 'string',
          friendly: 'Elapsed',
          tooltip: 'The real running time',
          filter: true
        },
        timelimit: {
          index: 11,
          type: 'string',
          friendly: 'Time limit',
          tooltip: 'The time you requested',
          filter: true
        },
        timeError: {
          index: 12,
          type: 'string',
          friendly: 'Time estimation',
          tooltip: 'Correcteness of running time versus requested time.',
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
        Start: data[i][j++],
        End: data[i][j++],
        Elapsed: data[i][j++],
        timelimit: data[i][j++],
        timeError: 'n/a'
      };
      // If the satus of the job is completed,
      // we check if the time required by the user
      // is more or less accurate with the real
      // elapsed time.
      if (jsonStruct.rows[i].State == 'COMPLETED') {
        var nbSecTimeLimit =
            slurm.convertSlurmDateToSec(jsonStruct.rows[i].timelimit);
        var nbSecElapsed =
            slurm.convertSlurmDateToSec(jsonStruct.rows[i].Elapsed);
        var diff;
        if (nbSecTimeLimit && nbSecElapsed) {
          diff = ((nbSecTimeLimit / nbSecElapsed) - 1) * 100;
          if (diff >= 100) {
            jsonStruct.rows[i].timeError = 'very bad';
          }else if (diff > 75) {
            jsonStruct.rows[i].timeError = 'bad';
          }else if (diff > 50) {
            jsonStruct.rows[i].timeError = 'average';
          }else if (diff > 25) {
            jsonStruct.rows[i].timeError = 'good';
          }else if (diff > 00) {
            jsonStruct.rows[i].timeError = 'very good';
          }
        }
      }
    }
    res.render('resjson', { data: JSON.stringify(jsonStruct) });
  }
};

exports.reservations = function() {
  return function(req, res) {
    var reservation = require('.././reservation');
    var data = reservation.execute();
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

exports.faq = function() {
  return function(req, res) {
    var fs = require('fs');
    fs.readFile(__dirname + '/../faq.json',
        {'encoding': 'utf8'}, function(err, data) {
          if (err) throw err;
          res.render('resjson', { data: data });
        });
  };
};

exports.status = function() {
  return function(req, res) {
    var result = require('child_process').execSync(
        '/usr/bin/sinfo -a --noheader', { encoding: 'utf-8' }
        );
    var lines = result.split('\n');
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
