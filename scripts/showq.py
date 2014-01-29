#!/usr/bin/python

from contrib.tabulate import tabulate
from optparse import OptionParser
from slurm.slurm import *
from slurm.slurmtime import *
from json import dumps as jdumps

## Common

def abbr( string, length ):
  if len(string) <= length:
    return string
  else:
    return string[0:length-3] + "..."

## Running

def runningCols(job):
  nodes = "%s (%s)" % (job.numNodes,job.nodes)
  end = diffDate(job.end)
  name = abbr( job.name, 12 )
  return [ job.jobid, name, job.user, job.partition, end, nodes ]

def runningTable( jobs ):
  header = ['ID', 'Job', 'User', 'Partition', 'Remaining', 'Nodes']
  rows = list( map( runningCols, jobs ) )
  return rows, header

def runningJson( job ):
  return {
    'jobid': job.jobid,
    'name': job.name,
    'user': job.user,
    'partition': job.partition,
    'numNodes': job.numNodes,
    'nodes': job.numNodes,
    'end': diffDate(job.end)
  }    

def printRunning( queue ):
  running = queue.running()
  if len(running) == 0:
    print "No running jobs"
    return
  r,h = runningTable(running)
  print tabulate(r,h)

## Pending

def pendingCols(job):
  if job.start:
    start = diffDate(job.start)
  else:
    start = "N/A"
  name = abbr( job.name, 12 )
  return [job.jobid, name, job.user, job.partition, job.limit, start, job.priority, job.numNodes]


def pendingTable( jobs ):
  header = ['ID', 'Job', 'User', 'Partition', 'Requested', 'Est. Start', 'Priority', 'Nodes']
  rows = list( map( pendingCols, jobs ) )
  return rows, header

def pendingJson( job ):
  j = {
    'jobid': job.jobid,
    'name': job.name,
    'user': job.user,
    'partition': job.partition,
    'numNodes': job.numNodes,
    'priority': job.priority,
    'limit': job.limit
  }
  if job.start:
    j['start'] = diffDate(job.start)
  else:
    j['start'] = None
  return j

def printPending( queue, limit ):
  pending = queue.pending()
  if len(pending) == 0:
    print "No pending jobs"
    return
  notLate = pending[0:limit]
  late = pending[limit:]
  r,h = pendingTable(notLate)
  print tabulate(r,h)
  if len(late) > 0:
    others = len(late)
    maxPri = max(map(lambda j: j.priority, late))
    print "  %d more jobs pending, with max priority = %d" % (others,maxPri)


## JSON

def printJson( queue ):
  res = {}
  running = queue.running()
  if len(running) > 0:
    res['running'] = map( runningJson, running )
  pending = queue.pending()
  if len(pending) > 0:
    res['pending'] = map( pendingJson, pending )
  print jdumps( res )


## MAIN #######################################

def main():
  NUM_PENDING = 20
  usage = "usage: %prog [options] [partition]"
  parser = OptionParser(usage=usage)
  parser.add_option( "-R", "--running", 
                    action="store_true", 
                    dest="runningOnly",
                    default=False,
                    help="Show only running jobs")
  parser.add_option( "-P", "--pending", 
                    action="store_true", 
                    dest="pendingOnly",
                    default=False,
                    help="Show only pending jobs")
  parser.add_option( "-c", "--cgi", 
                    action="store_true", 
                    dest="cgi",
                    default=False,
                    help="Output CGI compatible code")
  parser.add_option( "-j", "--json", 
                    action="store_true", 
                    dest="json",
                    default=False,
                    help="Output JSON")
  options, args = parser.parse_args()
  if options.runningOnly and options.pendingOnly:
    parser.error("options -R and -P are mutually exclusive")

  if len(args) > 0:
    part = args[0]
    queue = Queue.current().partition(part)
  else:
    queue = Queue.current()

  if options.json:
    printJson(queue)
    return

  if options.cgi:
    print "Content-type: text/html"
    print ""
    print "<pre>"
    
  if options.runningOnly:
    printRunning(queue)
  elif options.pendingOnly:
    printPending(queue,NUM_PENDING)
  else:
    print "== RUNNING ==\n"
    printRunning(queue)
    print "\n== PENDING ==\n"
    printPending(queue,NUM_PENDING)

  if options.cgi:
    print "</pre>"


if __name__ == "__main__":
    main()
