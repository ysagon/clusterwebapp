from slurmtime import *
import subprocess
import re


## JOBParameter ######################################

class JobParam:
  def __init__( self, name, fmt, parser ):
    self.__dict__.update(locals())

  def set( self, obj, s ):
    return setattr( obj, self.name, self.parser(s) )

  @staticmethod
  def int( name, fmt ):
    return JobParam( name, fmt, lambda s: int(s) )
  @staticmethod
  def str( name, fmt ):
    return JobParam( name, fmt, lambda s: s )

  @staticmethod
  def date( name, fmt ):
    def doIt( s ):
      if s != 'N/A' :
        return parseDate( s )
      else:
        return None
    return JobParam( name, fmt, doIt )



## JOBS ######################################

class Job:

  @staticmethod
  def parse( line, params ):
    tokens = re.split( """\s+""", line )
    j = Job()
    for i in xrange(0,len(params)):
      params[i].set( j, tokens[i] )
    return j

  def __repr__(self):
    return "Job(%s)" % (self.jobid)


## QUEUES ############################################

class Queue:

  def __init__(self,jobs):
    self.jobs = jobs

  def __selectState( self, s ):
    return list( filter( lambda x: x.state == s, self.jobs) )

  def running(self):
    return sorted( self.__selectState( "R" ), key=lambda j: j.end )

  def partition(self, part):
    partJobs = filter( lambda j: j.partition == part, self.jobs )
    return Queue( partJobs )


  @staticmethod
  def __pdSortKey( job ):
    if job.start:
      return job.start
    else:
      return nextCentury()
  
  def pending(self):
    pds = sorted( self.__selectState( "PD" ), key=Queue.__pdSortKey )
    return pds

  @staticmethod
  def current():
    return Queue( Queue.__squeue() )

  @staticmethod
  def __command():
    fmt = ' '.join( map(lambda p: p.fmt, Queue.params() ) )
    cmd = ['squeue', '--all', '-h', '-o', fmt ]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE )
    return p.communicate()[0]

  @staticmethod         
  def __squeue():
    jobs = []
    for job in Queue.__command().split("\n"):
      if job != "":
        jobs.append( Job.parse(job, Queue.params()) )
    return jobs

  @staticmethod
  def params():
    return [
      JobParam.str( "jobid", "%i" ),
      JobParam.str( "user", "%u" ),
      JobParam.str( "state", "%t" ),
      JobParam.date( "end", "%e" ),
      JobParam.int( "priority", "%Q" ),
      JobParam.int( "CPUs", "%C" ),  
      JobParam.int( "numNodes", "%D" ),  
      JobParam.date( "start", "%S" ),
      JobParam.str( "partition", "%P" ),
      JobParam.str( "name", "%j" ),
      JobParam.str( "limit", "%l" ),
      JobParam.str( "nodes", "%N" )
    ]


